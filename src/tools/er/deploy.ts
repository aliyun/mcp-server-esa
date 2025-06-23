import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
import api from '../../utils/service.js';
import { PublishRoutineCodeVersionRequest } from '@alicloud/esa20240910';

export const ROUTINE_CODE_DEPLOY_TOOL: Tool = {
  name: 'routine_code_deploy',
  description:
    'Deploy a selected code version to the staging or production environment. If version is not exist, should call routine_code_commit first',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description:
          'The name of the routine, support lowercase English, numbers, and hyphens, must start with lowercase English, length cannot be less than 2 characters',
      },
      codeVersion: {
        type: 'string',
        description: 'Version of the routine, must be a valid semantic version',
      },
      env: {
        type: 'string',
        description:
          'Environment of the routine, must be "production" or "staging". If the user has no special requirements, it will be deployed to the production environment by default',
      },
    },
    required: ['name', 'codeVersion', 'env'],
  },
};

export const routine_code_deploy = async (request: CallToolRequest) => {
  const res = await api.publishRoutineCodeVersion(
    request.params.arguments as PublishRoutineCodeVersionRequest,
  );
  if (!res) {
    return {
      content: [
        {
          type: 'text',
          text: `Failed to publish routine code version. ${JSON.stringify(res)}`,
        },
      ],
      success: false,
    };
  } else {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(res),
        },
      ],
      success: true,
    };
  }
};
