import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
import api from '../../utils/service.js';
import {
  CommitRoutineStagingCodeRequest,
  CreateRoutineRequest,
  DeleteRoutineRequest,
  GetRoutineRequest,
  GetRoutineStagingCodeUploadInfoRequest,
  PublishRoutineCodeVersionRequest,
} from '@alicloud/esa20240910';
import { uploadCodeToOSS } from '../../utils/helpers.js';

// Prompt:帮我写个HTML部署在ER上
export const HTML_DEPLOY_TOOL: Tool = {
  name: 'html_deploy',
  description:
    'Quickly deploy an HTML page to ESA Edge Routine (ER) and return a default access URL to the user.',
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

// Prompt: 帮我创建一个er名称是test-kl-2 描述是test 代码是helloworld
export const ROUTINE_CREATE_TOOL: Tool = {
  name: 'routine_create',
  description: 'Create a new Edge Routine (ER) in your Alibaba Cloud account.',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description:
          'The name of the routine, support lowercase English, numbers, and hyphens, must start with lowercase English, length cannot be less than 2 characters',
      },
      description: {
        type: 'string',
        description: 'Description of the routine, no spaces',
      },
    },
    required: ['name'],
  },
};

export const ROUTINE_DELETE_TOOL: Tool = {
  name: 'routine_delete',
  description:
    'Delete an existing Edge Routine (ER) from your Alibaba Cloud account.',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the routine to delete',
      },
    },
    required: ['name'],
  },
};

export const ROUTINE_LIST_TOOL: Tool = {
  name: 'routine_list',
  description: 'List all Edge Routines (ERs) in your Alibaba Cloud account.',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const ROUTINE_GET_TOOL: Tool = {
  name: 'routine_get',
  description: 'Get a the details of a Edge Routine (ER).',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the routine to get details for',
      },
    },
    required: ['name'],
  },
};

export const html_deploy = async (request: CallToolRequest) => {
  // Escape backticks and dollar signs in the HTML string
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

  const createRoutineRes = await api.createRoutine({
    name: request?.params?.arguments?.name || '',
    code: code,
  } as unknown as CreateRoutineRequest);
  // Create Edge Routine
  if (
    createRoutineRes.statusCode === 200 &&
    createRoutineRes.body?.status === 'OK'
  ) {
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
            type: 'text',
            text: `Failed to get routine staging code upload info. ${JSON.stringify(getOssInfoRes)}`,
          },
        ],
        success: false,
      };
    } else {
      const uploadRes = await uploadCodeToOSS(getOssInfoRes, code as string);
      if (uploadRes !== true) {
        return {
          content: [
            {
              type: 'text',
              text: `Failed to upload code to OSS. ${uploadRes}`,
            },
          ],
          success: false,
        };
      } else {
        const commitRes = await api.commitRoutineStagingCode(
          request.params.arguments as CommitRoutineStagingCodeRequest,
        );
        if (commitRes.statusCode !== 200) {
          return {
            content: [
              {
                type: 'text',
                text: `Failed to commit routine staging code. ${JSON.stringify(commitRes)}`,
              },
            ],
            success: false,
          };
        } else {
          const deployRes = await api.publishRoutineCodeVersion({
            name: request?.params?.arguments?.name || '',
            env: 'production',
            codeVersion: commitRes?.body?.codeVersion,
          } as PublishRoutineCodeVersionRequest);
          if (deployRes.statusCode === 200) {
            const res = await api.getRoutine({
              name: request?.params?.arguments?.name || '',
            } as GetRoutineRequest);
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify(res),
                },
              ],
              success: true,
            };
          } else {
            return {
              content: [
                {
                  type: 'text',
                  text: `Failed to get routine. ${JSON.stringify(deployRes)}`,
                },
              ],
              success: false,
            };
          }
        }
      }
    }
  } else {
    return {
      content: [
        {
          type: 'text',
          text: `Failed to create routine. ${JSON.stringify(createRoutineRes)}`,
        },
      ],
      success: false,
    };
  }
};

export const routine_create = async (request: CallToolRequest) => {
  const res = await api.createRoutine(
    request.params.arguments as CreateRoutineRequest,
  );

  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(res),
      },
    ],
    success: true,
  };
};

export const routine_delete = async (request: CallToolRequest) => {
  const res = await api.deleteRoutine(
    request.params.arguments as DeleteRoutineRequest,
  );
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(res),
      },
    ],
    success: true,
  };
};

export const routine_list = async () => {
  const res = await api.getRoutineUserInfo();
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(res),
      },
    ],
    success: true,
  };
};

export const routine_get = async (request: CallToolRequest) => {
  const res = await api.getRoutine(
    request.params.arguments as GetRoutineRequest,
  );
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(res),
      },
    ],
    success: true,
  };
};
