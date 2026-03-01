import {
  ROUTINE_CREATE_TOOL,
  ROUTINE_DELETE_TOOL,
  ROUTINE_LIST_TOOL,
  ROUTINE_GET_TOOL,
  routine_create,
  routine_delete,
  routine_list,
  routine_get,
} from './routine';
import { ROUTINE_CODE_COMMIT_TOOL, routine_code_commit } from './commit';
import { ROUTINE_CODE_DEPLOY_TOOL, routine_code_deploy } from './deploy';
import { DEPLOYMENT_DELETE_TOOL, deployment_delete } from './deployments';
import {
  ER_RECORD_CREATE_TOOL,
  ER_RECORD_DELETE_TOOL,
  ER_RECORD_LIST_TOOL,
  er_record_create,
  er_record_delete,
  er_record_list,
} from './record';
import {
  ROUTE_CREATE_TOOL,
  ROUTE_UPDATE_TOOL,
  ROUTE_DELETE_TOOL,
  ROUTE_GET_TOOL,
  ROUTINE_ROUTE_LIST_TOOL,
  SITE_ROUTE_LIST_TOOL,
  route_create,
  route_update,
  route_delete,
  route_get,
  routine_route_list,
  site_route_list,
} from './route';
import { ToolHandlers } from '../../utils/types';

export const ER_TOOLS = [
  ROUTINE_CREATE_TOOL,
  ROUTINE_DELETE_TOOL,
  ROUTINE_LIST_TOOL,
  ROUTINE_GET_TOOL,
  ROUTINE_CODE_COMMIT_TOOL,
  ROUTINE_CODE_DEPLOY_TOOL,
  DEPLOYMENT_DELETE_TOOL,
  ER_RECORD_CREATE_TOOL,
  ER_RECORD_DELETE_TOOL,
  ER_RECORD_LIST_TOOL,
  ROUTE_CREATE_TOOL,
  ROUTE_UPDATE_TOOL,
  ROUTE_DELETE_TOOL,
  ROUTE_GET_TOOL,
  ROUTINE_ROUTE_LIST_TOOL,
  SITE_ROUTE_LIST_TOOL,
];

export const erHandlers: ToolHandlers = {
  routine_create,
  routine_delete,
  routine_list,
  routine_get,
  routine_code_commit,
  routine_code_deploy,
  deployment_delete,
  er_record_create,
  er_record_delete,
  er_record_list,
  route_create,
  route_update,
  route_delete,
  route_get,
  routine_route_list,
  site_route_list,
};
