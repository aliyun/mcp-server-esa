import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import {
  ListRoutineCanaryAreasResponse,
  PublishRoutineCodeVersionRequest,
} from "@alicloud/esa20240910";
import { ApiServer } from "../utils/service";

export const ROUTINE_CODE_DEPLOY_TOOL: Tool = {
  name: "routine_code_deploy",
  description:
    "Deploy a routine code, must be a valid semantic version. If version is not exist, should call routine_code_commit first",
  inputSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description:
          "The name of the routine, support lowercase English, numbers, and hyphens, must start with lowercase English, length cannot be less than 2 characters",
      },
      codeVersion: {
        type: "string",
        description: "Version of the routine, must be a valid semantic version",
      },
      env: {
        type: "string",
        description:
          'Environment of the routine, must be "production" or "staging". If the user has no special requirements, it will be deployed to the production environment by default',
      },
      canaryAreaList: {
        type: "array",
        description:
          "The regions for canary release, must be a valid region name. Need to call ListRoutineCanaryAreas method to get",
      },
      canaryCodeVersion: {
        type: "string",
        description: "Version of the routine, must be a valid semantic version",
      },
    },
    required: ["name", "codeVersion", "env"],
  },
};

export const CANARY_AREA_LIST: Tool = {
  name: "canary_area_list",
  description: "List all available canary areas for routine deployment",
  inputSchema: {
    type: "object",
    properties: {},
  },
};

export const routine_code_deploy = async (
  request: CallToolRequest,
  api: ApiServer
) => {
  const res = await api.publishRoutineCodeVersion(
    request.params.arguments as PublishRoutineCodeVersionRequest
  );
  if (!res) {
    return {
      content: [
        {
          type: "text",
          text: `Failed to publish routine code version. ${JSON.stringify(res)}`,
        },
      ],
      success: false,
    };
  } else {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(res),
        },
      ],
      success: true,
    };
  }
};

export const canary_area_list = async (
  request: CallToolRequest,
  api: ApiServer
) => {
  const res: ListRoutineCanaryAreasResponse =
    await api.listRoutineCanaryAreas();
  if (res.statusCode !== 200) {
    return {
      content: [
        {
          type: "text",
          text: `Failed to list canary areas. ${JSON.stringify(res)}`,
        },
      ],
      success: false,
    };
  } else {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(res.body?.canaryAreas || []),
        },
      ],
      success: true,
    };
  }
};
