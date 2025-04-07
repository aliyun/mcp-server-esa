import { ToolHandlers } from '../utils/types';
import { routine_code_commit, ROUTINE_CODE_COMMIT_TOOL } from './commit';
import {
  CANARY_AREA_LIST,
  canary_area_list,
  routine_code_deploy,
  ROUTINE_CODE_DEPLOY_TOOL,
} from './deploy';
import { deployment_delete, DEPLOYMENT_DELETE_TOOL } from './deployments';
import {
  ROUTINE_CREATE_TOOL,
  ROUTINE_DELETE_TOOL,
  ROUTINE_LIST_TOOL,
  ROUTINE_GET_TOOL,
  routine_delete,
  routine_create,
  routine_list,
  routine_get,
} from './routine';
import { site_active_list, SITE_ACTIVE_LIST_TOOL } from './site';

export const ESA_OPENAPI_ER_LIST = [
  ROUTINE_CREATE_TOOL,
  ROUTINE_DELETE_TOOL,
  ROUTINE_LIST_TOOL,
  ROUTINE_GET_TOOL,
  ROUTINE_CODE_COMMIT_TOOL,
  ROUTINE_CODE_DEPLOY_TOOL,
  CANARY_AREA_LIST,
  DEPLOYMENT_DELETE_TOOL,
  SITE_ACTIVE_LIST_TOOL,
];

export const ESA_OPENAPI_LIST = [...ESA_OPENAPI_ER_LIST];
export const routineHandlers: ToolHandlers = {
  routine_create,
  routine_delete,
  routine_list,
  routine_get,
  routine_code_commit,
  routine_code_deploy,
  canary_area_list,
  deployment_delete,
  site_active_list,
};
