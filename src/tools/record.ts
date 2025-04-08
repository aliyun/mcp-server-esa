import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
import api from '../utils/service.js';
import {
  CreateRoutineRelatedRecordRequest,
  DeleteRoutineRelatedRecordRequest,
} from '@alicloud/esa20240910';
import { ListRoutineRelatedRecordsRequest } from '../utils/types.js';

export const RECORD_CREATE_TOOL: Tool = {
  name: 'record_create',
  description: 'Create a record',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the routine',
      },
      siteId: {
        type: 'number',
        description: 'The ID of the site',
      },
      recordName: {
        type: 'string',
        description: 'The name of the record',
      },
    },
    required: ['name', 'siteId', 'recordName'],
  },
};

export const RECORD_DELETE_TOOL: Tool = {
  name: 'record_delete',
  description: 'Delete a record',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the routine',
      },
      recordId: {
        type: 'number',
        description: 'The ID of the record',
      },
      siteId: {
        type: 'number',
        description: 'The ID of the site',
      },
      recordName: {
        type: 'string',
        description: 'The name of the record',
      },
    },
    required: ['name', 'siteId', 'recordName'],
  },
};

export const RECORD_LIST_TOOL: Tool = {
  name: 'record_list',
  description: 'List all records',
  inputSchema: {
    type: 'object',
    properties: {
      Name: {
        type: 'string',
        description: 'The name of the routine',
      },
      PageNumber: {
        type: 'number',
        description: 'The page number of the records',
      },
      PageSize: {
        type: 'number',
        description: 'The page size of the records',
      },
      SearchKeyWord: {
        type: 'string',
        description: 'The search key word of the records',
      },
    },
    required: ['Name'],
  },
};

export const record_create = async (request: CallToolRequest) => {
  const res = await api.createRoutineRelatedRecord(
    request.params.arguments as CreateRoutineRelatedRecordRequest,
  );

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const record_delete = async (request: CallToolRequest) => {
  const res = await api.deleteRoutineRelatedRecord(
    request.params.arguments as DeleteRoutineRelatedRecordRequest,
  );
  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const record_list = async (request: CallToolRequest) => {
  const res = await api.listRoutineRelatedRecords(
    request.params.arguments as unknown as ListRoutineRelatedRecordsRequest,
  );
  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};
