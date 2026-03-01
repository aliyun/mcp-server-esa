import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
import api from '../../utils/service.js';
import {
  CommitRoutineStagingCodeRequest,
  CreateRoutineRequest,
  GetRoutineRequest,
  GetRoutineStagingCodeUploadInfoRequest,
  PublishRoutineCodeVersionRequest,
} from '@alicloud/esa20240910';
import { log, uploadCodeToOSS } from '../../utils/helpers.js';

export const HTML_DEPLOY_TOOL: Tool = {
  name: 'html_deploy',
  description:
    'Quickly deploy an HTML page to ESA Function & Pages and return a default access URL to the user.',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description:
          'The name of the routine, supports lowercase English letters, numbers, and hyphens, must start with a lowercase letter, and must be at least 2 characters long. For example: hello-world',
      },
      html: {
        type: 'string',
        description:
          'An HTML string which user want to deploy. For example: <html><body>Hello World</body></html>',
      },
    },
    required: ['name', 'html'],
  },
  annotations: {
    readOnlyHint: false,
    idempotentHint: false,
  },
};

export const html_deploy = async (request: CallToolRequest) => {
  const routineName = request?.params?.arguments?.name as string;
  const html = (request?.params?.arguments?.html as string)
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');

  const code = `const html = \`${html}\`;

async function handleRequest(request) {
  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
    },
  });
}

export default {
  async fetch(request) {
    return handleRequest(request);
  },
};
  `;

  try {
    // Ensure routine exists (create if new, skip if already exists)
    try {
      await api.createRoutine({
        name: routineName,
        code: code,
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

    // Get staging code upload info
    const getOssInfoRes = await api.getRoutineStagingCodeUploadInfo(
      request.params.arguments as GetRoutineStagingCodeUploadInfoRequest,
    );
    if (
      !getOssInfoRes ||
      getOssInfoRes?.statusCode !== 200 ||
      !getOssInfoRes?.body?.ossPostConfig?.OSSAccessKeyId
    ) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Failed to get routine staging code upload info. ${JSON.stringify(getOssInfoRes)}`,
          },
        ],
        isError: true,
      };
    }

    // Upload code to OSS
    const uploadRes = await uploadCodeToOSS(getOssInfoRes, code as string);
    if (uploadRes !== true) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Failed to upload code to OSS. ${uploadRes}`,
          },
        ],
        isError: true,
      };
    }

    // Commit staging code to create a version
    const commitRes = await api.commitRoutineStagingCode(
      request.params.arguments as CommitRoutineStagingCodeRequest,
    );
    if (commitRes.statusCode !== 200) {
      return {
        content: [
          {
            type: 'text' as const,
            text: `Failed to commit routine staging code. ${JSON.stringify(commitRes)}`,
          },
        ],
        isError: true,
      };
    }

    const codeVersion = commitRes?.body?.codeVersion as string;
    const deployedTo: string[] = [];
    const deployErrors: string[] = [];

    // Deploy to staging
    try {
      const stagingRes = await api.publishRoutineCodeVersion({
        name: routineName,
        env: 'staging',
        codeVersion,
      } as PublishRoutineCodeVersionRequest);
      log(`Staging deploy response: statusCode=${stagingRes?.statusCode}`);
      if (stagingRes?.statusCode === 200) {
        deployedTo.push('staging');
      } else {
        deployErrors.push(`Staging deploy failed: ${JSON.stringify(stagingRes)}`);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      log(`Staging deploy error: ${msg}`);
      deployErrors.push(`Staging deploy error: ${msg}`);
    }

    // Deploy to production
    try {
      const productionRes = await api.publishRoutineCodeVersion({
        name: routineName,
        env: 'production',
        codeVersion,
      } as PublishRoutineCodeVersionRequest);
      log(`Production deploy response: statusCode=${productionRes?.statusCode}`);
      if (productionRes?.statusCode === 200) {
        deployedTo.push('production');
      } else {
        deployErrors.push(`Production deploy failed: ${JSON.stringify(productionRes)}`);
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
            text: `Code version ${codeVersion} committed but deployment failed.\n${deployErrors.join('\n')}`,
          },
        ],
        isError: true,
      };
    }

    // Get routine info for access URL
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
          text: `Error during HTML deployment: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
};
