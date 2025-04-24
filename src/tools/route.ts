import { CallToolRequest, Tool } from "@modelcontextprotocol/sdk/types.js";
import { ApiServer } from "../utils/service.js";
import {
  CreateRoutineRouteRequest,
  DeleteRoutineRouteRequest,
  GetRoutineRouteRequest,
  ListRoutineRoutesRequest,
  ListSiteRoutesRequest,
  UpdateRoutineRouteRequest,
} from "@alicloud/esa20240910";
import { transferRouteToRuleString } from "../utils/helpers.js";

export const ROUTE_CREATE_TOOL: Tool = {
  name: "route_create",
  description: "Create a edge routine(ER) related route",
  inputSchema: {
    type: "object",
    properties: {
      siteId: {
        type: "number",
        description: "The ID of the site",
      },
      mode: {
        type: "enum",
        enum: ["simple", "custom"],
        description: "The mode of the route, default is simple",
      },
      route: {
        type: "string",
        description:
          "The route of the route, if mode is simple, this field is required",
      },
      rule: {
        type: "string",
        description:
          "The rule of the route, if mode is custom, this field is required",
      },
      routineName: {
        type: "string",
        description: "The name of the routine",
      },
      routeName: {
        type: "string",
        description: "The name of the route, use to identify the route",
      },
      bypass: {
        type: "enum",
        enum: ["on", "off"],
        description: "The bypass of the route, default is off",
      },
      routeEnable: {
        type: "enum",
        enum: ["on", "off"],
        description: "The enable of the route, default is on",
      },
      sequence: {
        type: "number",
        description:
          "The sequence of the route, if not passed, default is the current number of routes",
      },
    },
    required: [
      "siteId",
      "mode",
      "rule",
      "routineName",
      "routeName",
      "bypass",
      "routeEnable",
    ],
  },
};

export const ROUTE_UPDATE_TOOL: Tool = {
  name: "route_update",
  description: "Update a routine related route",
  inputSchema: {
    type: "object",
    properties: {
      siteId: {
        type: "number",
        description: "The ID of the site",
      },
      configId: {
        type: "number",
        description: "The ID of the config",
      },
      routeName: {
        type: "string",
        description: "The name of the route, use to identify the route",
      },
      routeEnable: {
        type: "enum",
        enum: ["on", "off"],
        description: "The enable of the route",
      },
      rule: {
        type: "string",
        description: "The rule of the route",
      },
      routineName: {
        type: "string",
        description: "The name of the routine",
      },
      bypass: {
        type: "enum",
        enum: ["on", "off"],
        description: "The bypass of the route ",
      },
      sequence: {
        type: "number",
        description:
          "The sequence of the route, if not passed, default is the current number of routes",
      },
    },
    required: [
      "siteId",
      "configId",
      "routeName",
      "routeEnable",
      "rule",
      "routineName",
      "bypass",
    ],
  },
};

export const ROUTE_DELETE_TOOL: Tool = {
  name: "route_delete",
  description: "Delete a routine related route",
  inputSchema: {
    type: "object",
    properties: {
      siteId: {
        type: "number",
        description: "The ID of the site",
      },
      configId: {
        type: "number",
        description: "The ID of the config",
      },
    },
    required: ["siteId", "configId"],
  },
};

export const ROUTE_GET_TOOL: Tool = {
  name: "route_get",
  description: "Get a routine related route",
  inputSchema: {
    type: "object",
    properties: {
      siteId: {
        type: "number",
        description: "The ID of the site",
      },
      configId: {
        type: "number",
        description: "The ID of the config",
      },
    },
    required: ["siteId", "configId"],
  },
};

export const ROUTINE_ROUTE_LIST_TOOL: Tool = {
  name: "routine_route_list",
  description: "List all routes of a routine",
  inputSchema: {
    type: "object",
    properties: {
      routineName: {
        type: "string",
        description: "The name of the routine",
      },
      routeName: {
        type: "string",
        description: "The name of the route, use to filter list results",
      },

      pageNumber: {
        type: "number",
        description: "The page number of the routes",
      },
      pageSize: {
        type: "number",
        description: "The page size of the routes",
      },
    },
    required: ["routineName"],
  },
};

export const SITE_ROUTE_LIST_TOOL: Tool = {
  name: "site_route_list",
  description: "List all routes of a site",
  inputSchema: {
    type: "object",
    properties: {
      siteId: {
        type: "number",
        description: "The ID of the site",
      },
      routeName: {
        type: "string",
        description: "The name of the route, use to filter list results",
      },

      pageNumber: {
        type: "number",
        description: "The page number of the routes",
      },
      pageSize: {
        type: "number",
        description: "The page size of the routes",
      },
    },
    required: ["siteId"],
  },
};
export const route_create = async (
  request: CallToolRequest,
  api: ApiServer
) => {
  const { mode, route } = request.params.arguments as CreateRoutineRouteRequest;

  if (mode === "simple") {
    const res = await api.createRoutineRoute({
      ...request.params.arguments,
      rule: transferRouteToRuleString(route),
    } as unknown as CreateRoutineRouteRequest);
    return {
      content: [{ type: "text", text: JSON.stringify(res) }],
      success: true,
    };
  } else {
    const res = await api.createRoutineRoute(
      request.params.arguments as CreateRoutineRouteRequest
    );
    return {
      content: [{ type: "text", text: JSON.stringify(res) }],
      success: true,
    };
  }
};

export const route_delete = async (
  request: CallToolRequest,
  api: ApiServer
) => {
  const res = await api.deleteRoutineRoute(
    request.params.arguments as DeleteRoutineRouteRequest
  );
  return {
    content: [{ type: "text", text: JSON.stringify(res) }],
    success: true,
  };
};

export const route_update = async (
  request: CallToolRequest,
  api: ApiServer
) => {
  const { mode, route } = request.params.arguments as CreateRoutineRouteRequest;
  if (mode === "simple") {
    const res = await api.updateRoutineRoute({
      ...request.params.arguments,
      rule: transferRouteToRuleString(route),
    } as unknown as UpdateRoutineRouteRequest);
    return {
      content: [{ type: "text", text: JSON.stringify(res) }],
      success: true,
    };
  } else {
    const res = await api.updateRoutineRoute(
      request.params.arguments as UpdateRoutineRouteRequest
    );
    return {
      content: [{ type: "text", text: JSON.stringify(res) }],
      success: true,
    };
  }
};

export const route_get = async (request: CallToolRequest, api: ApiServer) => {
  const res = await api.getRoutineRoute(
    request.params.arguments as GetRoutineRouteRequest
  );
  return {
    content: [{ type: "text", text: JSON.stringify(res) }],
    success: true,
  };
};

export const routine_route_list = async (
  request: CallToolRequest,
  api: ApiServer
) => {
  const res = await api.listRoutineRoutes(
    request.params.arguments as ListRoutineRoutesRequest
  );
  return {
    content: [{ type: "text", text: JSON.stringify(res) }],
    success: true,
  };
};

export const site_route_list = async (
  request: CallToolRequest,
  api: ApiServer
) => {
  const res = await api.listSiteRoutes(
    request.params.arguments as ListSiteRoutesRequest
  );
  return {
    content: [{ type: "text", text: JSON.stringify(res) }],
    success: true,
  };
};
