import fs from 'fs';
import path from 'path';
import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
import AdmZip from 'adm-zip';
import { CreateRoutineRequest, GetRoutineRequest } from '@alicloud/esa20240910';
import api from '../../utils/service.js';
import { log } from '../../utils/helpers.js';

export const FOLDER_DEPLOY_TOOL: Tool = {
  name: 'folder_deploy',
  description:
    'Deploy a local folder of static files (HTML/CSS/JS/images etc.) to ESA Function & Pages and return a default access URL. The folder will be packaged as assets and uploaded.',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description:
          'The name of the routine, supports lowercase English letters, numbers, and hyphens, must start with a lowercase letter, and must be at least 2 characters long.',
      },
      path: {
        type: 'string',
        description:
          'Absolute path to the local folder containing static files to deploy.',
      },
      description: {
        type: 'string',
        description: 'Optional description for this deployment version.',
      },
    },
    required: ['name', 'path'],
  },
  annotations: {
    readOnlyHint: false,
    idempotentHint: false,
  },
};

function addDirectoryToZip(
  zip: AdmZip,
  dirPath: string,
  baseDir: string,
): string[] {
  const fileList: string[] = [];
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      fileList.push(...addDirectoryToZip(zip, fullPath, baseDir));
    } else {
      const fileContent = fs.readFileSync(fullPath);
      const relativePath = path
        .relative(baseDir, fullPath)
        .split(path.sep)
        .join('/');
      zip.addFile(`assets/${relativePath}`, fileContent);
      fileList.push(`assets/${relativePath}`);
    }
  }

  return fileList;
}

async function waitForCodeVersionReady(
  name: string,
  codeVersion: string,
  timeoutMs = 5 * 60 * 1000,
  intervalMs = 1000,
): Promise<boolean> {
  const start = Date.now();
  log(`Waiting for code version ${codeVersion} to be ready...`);

  while (Date.now() - start < timeoutMs) {
    try {
      const info = await api.getRoutineCodeVersionInfo({
        Name: name,
        CodeVersion: codeVersion,
      });
      const status = (info?.body?.Status as string)?.toLowerCase();
      if (status === 'available') {
        log(`Code version ${codeVersion} is available`);
        return true;
      }
      if (status && status !== 'init') {
        log(`Code version ${codeVersion} build status: ${status}`);
        return false;
      }
    } catch (_) {
      // swallow and retry
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  log(`Waiting for code version ${codeVersion} timed out`);
  return false;
}

export const folder_deploy = async (request: CallToolRequest) => {
  const routineName = request?.params?.arguments?.name as string;
  const folderPath = request?.params?.arguments?.path as string;
  const description = (request?.params?.arguments?.description as string) || '';

  if (!fs.existsSync(folderPath)) {
    return {
      content: [
        {
          type: 'text' as const,
          text: `Folder not found: ${folderPath}`,
        },
      ],
      isError: true,
    };
  }

  const stat = fs.statSync(folderPath);
  if (!stat.isDirectory()) {
    return {
      content: [
        {
          type: 'text' as const,
          text: `Path is not a directory: ${folderPath}`,
        },
      ],
      isError: true,
    };
  }

  const zip = new AdmZip();
  const fileList = addDirectoryToZip(zip, folderPath, folderPath);
  log(`Packaged ${fileList.length} files into zip`);

  if (fileList.length === 0) {
    return {
      content: [
        {
          type: 'text' as const,
          text: `Folder is empty: ${folderPath}`,
        },
      ],
      isError: true,
    };
  }

  try {
    // Ensure the routine exists before creating an assets code version
    try {
      await api.createRoutine({
        name: routineName,
        description: description,
      } as unknown as CreateRoutineRequest);
      log(`Routine "${routineName}" created successfully`);
    } catch (e: unknown) {
      const errMsg = e instanceof Error ? e.message : String(e);
      if (errMsg.includes('RoutineNameAlreadyExist') || errMsg.includes('already exist')) {
        log(`Routine "${routineName}" already exists, proceeding with deployment`);
      } else {
        throw e;
      }
    }

    const apiResult = await api.createRoutineWithAssetsCodeVersion({
      Name: routineName,
      CodeDescription: description,
    });

    if (
      !apiResult ||
      apiResult.statusCode !== 200 ||
      !apiResult.body?.OssPostConfig
    ) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Failed to create routine with assets code version. ${JSON.stringify(apiResult)}`,
          },
        ],
        isError: true,
      };
    }

    const ossConfig = apiResult.body.OssPostConfig;
    if (
      !ossConfig.OSSAccessKeyId ||
      !ossConfig.Signature ||
      !ossConfig.Url ||
      !ossConfig.Key ||
      !ossConfig.Policy
    ) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Missing required OSS configuration fields. ${JSON.stringify(ossConfig)}`,
          },
        ],
        isError: true,
      };
    }

    const zipBuffer = zip.toBuffer();
    let uploadSuccess = false;
    for (let attempt = 0; attempt < 3; attempt++) {
      uploadSuccess = await api.uploadZipToOSS(
        {
          OSSAccessKeyId: ossConfig.OSSAccessKeyId,
          Signature: ossConfig.Signature,
          Url: ossConfig.Url,
          Key: ossConfig.Key,
          Policy: ossConfig.Policy,
          XOssSecurityToken: ossConfig.XOssSecurityToken || '',
        },
        zipBuffer,
      );
      if (uploadSuccess) break;
      if (attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    if (!uploadSuccess) {
      return {
        content: [
          {
            type: 'text' as const,
            text: 'Failed to upload zip to OSS after 3 attempts.',
          },
        ],
        isError: true,
      };
    }

    const codeVersion = apiResult.body.CodeVersion as string;

    // Wait for the code version to become available before deploying
    const ready = await waitForCodeVersionReady(routineName, codeVersion);
    if (!ready) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Code version ${codeVersion} failed to become available within timeout. Deployment aborted.`,
          },
        ],
        isError: true,
      };
    }

    const deployedTo: string[] = [];
    const deployErrors: string[] = [];

    // Deploy to staging
    try {
      const stagingRes = await api.createRoutineCodeDeployment({
        Name: routineName,
        CodeVersions: [{ Percentage: 100, CodeVersion: codeVersion }],
        Strategy: 'percentage',
        Env: 'staging',
      });
      log(`Staging deploy response: ${JSON.stringify(stagingRes?.body)}`);
      if (stagingRes?.statusCode === 200) {
        deployedTo.push('staging');
      } else {
        deployErrors.push(`Staging deploy failed (status=${stagingRes?.statusCode}): ${JSON.stringify(stagingRes?.body)}`);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      log(`Staging deploy error: ${msg}`);
      deployErrors.push(`Staging deploy error: ${msg}`);
    }

    // Deploy to production
    try {
      const productionRes = await api.createRoutineCodeDeployment({
        Name: routineName,
        CodeVersions: [{ Percentage: 100, CodeVersion: codeVersion }],
        Strategy: 'percentage',
        Env: 'production',
      });
      log(`Production deploy response: ${JSON.stringify(productionRes?.body)}`);
      if (productionRes?.statusCode === 200) {
        deployedTo.push('production');
      } else {
        deployErrors.push(`Production deploy failed (status=${productionRes?.statusCode}): ${JSON.stringify(productionRes?.body)}`);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      log(`Production deploy error: ${msg}`);
      deployErrors.push(`Production deploy error: ${msg}`);
    }

    if (deployedTo.length === 0) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Code version ${codeVersion} created but deployment failed.\n${deployErrors.join('\n')}`,
          },
        ],
        isError: true,
      };
    }

    // Get routine info for default access URL
    let url = '';
    try {
      const routineRes = await api.getRoutine({
        name: routineName,
      } as GetRoutineRequest);
      const defaultRecord =
        routineRes?.body?.defaultRelatedRecord as string | undefined;
      if (defaultRecord) {
        url = `https://${defaultRecord}`;
      }
    } catch (_) {
      log('Could not fetch routine URL');
    }

    return {
      content: [
        {
          type: 'text' as const,
          text: JSON.stringify({
            success: true,
            name: routineName,
            codeVersion,
            filesUploaded: fileList.length,
            files: fileList,
            url: url || undefined,
            deployedTo,
            ...(deployErrors.length > 0 ? { warnings: deployErrors } : {}),
          }),
        },
      ],
    };
  } catch (error) {
    return {
      content: [
        {
          type: 'text' as const,
          text: `Error during folder deployment: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};
