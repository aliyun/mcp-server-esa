import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
import api from '../utils/service.js';
import { PublishRoutineCodeVersionRequest } from '@alicloud/esa20240910';

export const ROUTINE_CODE_DEPLOY_TOOL: Tool = {
  name: 'routine_code_deploy',
  description: 'Deploy a routine code',
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
          'Environment of the routine, must be "production" or "staging"',
      },
      canaryAreaList: {
        type: 'array',
        description:
          'The regions for canary release, must be a valid region name. Need to call ListRoutineCanaryAreas method to get',
      },
      canaryCodeVersion: {
        type: 'string',
        description: 'Version of the routine, must be a valid semantic version',
      },
    },
    required: ['name', 'codeVersion', 'env'],
  },
};

export const CANARY_AREA_LIST: Tool = {
  name: 'canary_area_list',
  description: 'List all available canary areas for routine deployment',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const routine_code_deploy = async (request: CallToolRequest) => {
  const res = await api.publishRoutineCodeVersion(
    request.params.arguments as PublishRoutineCodeVersionRequest,
  );
  if (!res) {
    return {
      result: `Failed to publish routine code version. ${JSON.stringify(res)}`,
      success: false,
    };
  } else {
    return { result: JSON.stringify(res), success: true };
  }
};

export const canary_area_list = async () => {
  const res = await api.listRoutineCanaryAreas();
  if (!res || !Array.isArray(res.canaryAreas)) {
    return {
      result: `Failed to list canary areas. ${JSON.stringify(res)}`,
      success: false,
    };
  } else {
    return { result: res.canaryAreas, success: true };
  }
};
