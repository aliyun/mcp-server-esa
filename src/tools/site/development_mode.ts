import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import api from '../../utils/service.js';
import {
    UpdateDevelopmentModeRequest,
    GetDevelopmentModeRequest,
  } from "@alicloud/esa20240910";
  
// Prompt:
export const UPDATED_EVELOPMENT_MODE_TOOL: Tool = {
    name: "update_development_mode",
    description:
      "Modifies the development mode configuration of your website. If you enable Development Mode, all requests bypass caching components on POPs and are redirected to the origin server. This allows clients to retrieve the most recent resources on the origin server.",
    inputSchema: {
      type: "object",
      properties: {
        siteId: {
          type: "number",
          description: "The website ID, which can be obtained by calling the ListSites operation.",
        },
        enable: {
          type: "string",
          description: "Specifies whether to enable Development Mode. on: enable, off: disable.",
          enum: ["on", "off"],
        },
      },
      required: ["siteId", "enable"],
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: true,
      },
    },
  };
  
  // Prompt:
  export const GET_DEVELOPMENT_MODE_TOOL: Tool = {
    name: "get_development_mode",
    description: "Query Site Developer Mode Configuration.",
    inputSchema: {
      type: "object",
      properties: {
        siteId: {
          type: "number",
          description: "Site ID, which can be obtained by calling the ListSites interface.",
        },
      },
      required: ["siteId"],
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: false,
      },
    },
  };

export const update_development_mode = async (request: CallToolRequest) => {
    const res = await api.updateDevelopmentMode(
      request.params.arguments as UpdateDevelopmentModeRequest,
    );
  
    return {
      content: [{ type: "text", text: JSON.stringify(res) }],
      success: true,
    };
  };
  
  export const get_development_mode = async (request: CallToolRequest) => {
    const res = await api.getDevelopmentMode(
      request.params.arguments as GetDevelopmentModeRequest,
    );
  
    return {
      content: [{ type: "text", text: JSON.stringify(res) }],
      success: true,
    };
  };
  