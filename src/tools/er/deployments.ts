import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
import api from '../../utils/service.js';
import { DeleteRoutineCodeVersionRequest } from '@alicloud/esa20240910';

export const DEPLOYMENT_DELETE_TOOL: Tool = {
  name: 'deployment_delete',
  description:
    'Delete a specified code version associated with an Edge Routine (ER).',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the deployment to delete',
      },
      codeVersion: {
        type: 'string',
        description: 'The version of the code to delete',
      },
    },
    required: ['name', 'codeVersion'],
  },
};

export const deployment_delete = async (request: CallToolRequest) => {
  const res = await api.deleteRoutineCodeVersion(
    request.params.arguments as DeleteRoutineCodeVersionRequest,
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
