import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
import api from '../utils/service.js';
import {
  CreateRoutineRequest,
  DeleteRoutineRequest,
  GetRoutineRequest,
} from '@alicloud/esa20240910';

export const ROUTINE_CREATE_TOOL: Tool = {
  name: 'routine_create',
  description: 'Create a routine',
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

export const ROUTINE_DELETE_TOOL: Tool = {
  name: 'routine_delete',
  description: 'Delete a routine',
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
  description: 'List all routines',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const ROUTINE_GET_TOOL: Tool = {
  name: 'routine_get',
  description: 'Get a routine detail by name',
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

export const routine_create = async (request: CallToolRequest) => {
  const res = await api.createRoutine(
    request.params.arguments as CreateRoutineRequest,
  );

  return { result: JSON.stringify(res), success: true };
};

export const routine_delete = async (request: CallToolRequest) => {
  const res = await api.deleteRoutine(
    request.params.arguments as DeleteRoutineRequest,
  );
  return { result: JSON.stringify(res), success: true };
};

export const routine_list = async () => {
  const res = await api.getRoutineUserInfo();
  return { result: JSON.stringify(res), success: true };
};

export const routine_get = async (request: CallToolRequest) => {
  const res = await api.getRoutine(
    request.params.arguments as GetRoutineRequest,
  );
  return { result: JSON.stringify(res), success: true };
};
