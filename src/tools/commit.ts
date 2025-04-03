import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
import { ToolHandlers } from '../utils/types';
import api from '../utils/service.js';
import {} from '@alicloud/esa20240910';

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

export const routineHandlers: ToolHandlers = {
  routine_code_commit,
};

export const ESA_OPENAPI_ER_LIST = [];
