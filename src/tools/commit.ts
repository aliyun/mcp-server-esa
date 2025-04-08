import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
import api from '../utils/service.js';
import {
  CommitRoutineStagingCodeRequest,
  GetRoutineStagingCodeUploadInfoRequest,
} from '@alicloud/esa20240910';
import { uploadCodeToOSS } from '../utils/helpers.js';

export const ROUTINE_CODE_COMMIT_TOOL: Tool = {
  name: 'routine_code_commit',
  description: 'Commit a routine code',
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
      code: {
        type: 'string',
        description:
          'Source Code of the routine, export default { async fetch(request) { return handleRequest(request); } }',
      },
    },
    required: ['name', 'code'],
  },
};
export const routine_code_commit = async (request: CallToolRequest) => {
  const res = await api.getRoutineStagingCodeUploadInfo(
    request.params.arguments as GetRoutineStagingCodeUploadInfoRequest,
  );
  if (!res) {
    return {
      content: [
        {
          type: 'text',
          text: `Failed to get routine staging code upload info. ${JSON.stringify(res)}`,
        },
      ],
      success: false,
    };
  } else {
    const uploadRes = await uploadCodeToOSS(
      res,
      request?.params?.arguments?.code as string,
    );
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
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(commitRes),
            },
          ],
          success: true,
        };
      }
    }
  }
};
