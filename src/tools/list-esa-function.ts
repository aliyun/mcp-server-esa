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
  er_record_create,
  ER_RECORD_CREATE_TOOL,
  er_record_delete,
  ER_RECORD_DELETE_TOOL,
  er_record_list,
  ER_RECORD_LIST_TOOL,
} from './record';
import {
  route_create,
  ROUTE_CREATE_TOOL,
  route_delete,
  ROUTE_DELETE_TOOL,
  route_get,
  ROUTE_GET_TOOL,
  route_update,
  ROUTE_UPDATE_TOOL,
  routine_route_list,
  ROUTINE_ROUTE_LIST_TOOL,
  site_route_list,
  SITE_ROUTE_LIST_TOOL,
} from './route';
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
import {
  site_active_list,
  SITE_ACTIVE_LIST_TOOL,
  site_dns_cname_domain_record_create,
  SITE_DNS_CNAME_DOMAIN_RECORD_CREATE_TOOL,
  site_dns_type_a_record_create,
  SITE_DNS_TYPE_A_RECORD_CREATE_TOOL,
  site_match,
  SITE_MATCH_TOOL,
  site_record_list,
  SITE_RECORD_LIST_TOOL,
} from './site';

export const ESA_OPENAPI_ER_LIST = [
  ROUTINE_CREATE_TOOL,
  ROUTINE_DELETE_TOOL,
  ROUTINE_LIST_TOOL,
  ROUTINE_GET_TOOL,
  ROUTINE_CODE_COMMIT_TOOL,
  ROUTINE_CODE_DEPLOY_TOOL,
  ROUTINE_ROUTE_LIST_TOOL,
  CANARY_AREA_LIST,
  DEPLOYMENT_DELETE_TOOL,
  SITE_ACTIVE_LIST_TOOL,
  SITE_ROUTE_LIST_TOOL,
  ROUTE_CREATE_TOOL,
  ROUTE_DELETE_TOOL,
  ROUTE_UPDATE_TOOL,
  ROUTE_GET_TOOL,
  SITE_MATCH_TOOL,
  ER_RECORD_CREATE_TOOL,
  ER_RECORD_DELETE_TOOL,
  ER_RECORD_LIST_TOOL,
  SITE_DNS_TYPE_A_RECORD_CREATE_TOOL,
  SITE_DNS_CNAME_DOMAIN_RECORD_CREATE_TOOL,
  SITE_RECORD_LIST_TOOL,
];

export const ESA_OPENAPI_LIST = [...ESA_OPENAPI_ER_LIST];
export const routineHandlers: ToolHandlers = {
  site_dns_type_a_record_create,
  site_dns_cname_domain_record_create,
  site_active_list,
  site_match,
  site_route_list,
  site_record_list,
  routine_create,
  routine_delete,
  routine_list,
  routine_get,
  routine_code_commit,
  routine_code_deploy,
  routine_route_list,
  canary_area_list,
  deployment_delete,
  route_create,
  route_delete,
  route_update,
  route_get,
  er_record_create,
  er_record_delete,
  er_record_list,
};
