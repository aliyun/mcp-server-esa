// import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
// import { ToolHandlers } from '../utils/types';
// import api from '../utils/service.js';
// import {
//   CreateRoutineRelatedRouteRequest,
//   DeleteRoutineRelatedRouteRequest,
// } from '@alicloud/esa20240910';

// export const ROUTE_CREATE_TOOL: Tool = {
//   name: 'route_create',
//   description: 'Create a route',
//   inputSchema: {
//     type: 'object',
//     properties: {
//       name: {
//         type: 'string',
//         description:
//           'The name of the route, support lowercase English, numbers, and hyphens, must start with lowercase English, length cannot be less than 2 characters',
//       },
//       siteId: {
//         type: 'number',
//         description: 'The ID of the site',
//       },
//       siteName: {
//         type: 'string',
//         description: 'The name of the site',
//       },
//       route: {
//         type: 'string',
//         description: 'The route of the routine',
//       },
//     },
//     required: ['name', 'siteId', 'siteName', 'route'],
//   },
// };

// export const ROUTE_DELETE_TOOL: Tool = {
//   name: 'route_delete',
//   description: 'Delete a route',
//   inputSchema: {
//     type: 'object',
//     properties: {
//       name: {
//         type: 'string',
//         description: 'The name of the route to delete',
//       },
//       siteId: {
//         type: 'number',
//         description: 'The ID of the site',
//       },
//       siteName: {
//         type: 'string',
//         description: 'The name of the site',
//       },
//       route: {
//         type: 'string',
//         description: 'The route of the routine',
//       },
//     },
//     required: ['name', 'siteId', 'siteName', 'route'],
//   },
// };

// export const route_create = async (request: CallToolRequest) => {
//   const res = await api.createRoutineRelatedRoute(
//     request.params.arguments as CreateRoutineRelatedRouteRequest,
//   );
//   return { result: JSON.stringify(res), success: true };
// };

// export const route_delete = async (request: CallToolRequest) => {
//   const res = await api.deleteRoutineRelatedRoute(
//     request.params.arguments as DeleteRoutineRelatedRouteRequest,
//   );
//   return { result: JSON.stringify(res), success: true };
// };

// export const routeHandlers: ToolHandlers = {
//   route_create,
//   route_delete,
// };

// export const ESA_OPENAPI_ROUTE_LIST = [ROUTE_CREATE_TOOL];
