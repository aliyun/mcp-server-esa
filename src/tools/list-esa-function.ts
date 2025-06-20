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
  HTML_DEPLOY_TOOL,
  html_deploy,
} from './routine';

import {
  site_active_list,
  SITE_ACTIVE_LIST_TOOL,
  site_match,
  SITE_MATCH_TOOL,
  create_site,
  CREATE_SITE_TOOL,
  update_site_pause,
  UPDATE_SITE_PAUSE_TOOL,
  get_site_pause,
  GET_SITE_PAUSE_TOOL,
  CHECK_SITE_NAME_TOOL,
  check_site_name,
  VERIFY_SITE_TOOL,
  verify_site,
  GET_SITE_TOOL,
  get_site,
  LIST_SITES_TOOL,
  list_sites,
  DELETE_SITE_TOOL,
  delete_site,
  UPDATE_SITE_COVERAGE_TOOL,
  update_site_coverage
} from './site/site';

import {
  UPDATED_EVELOPMENT_MODE_TOOL,
  update_development_mode,
  GET_DEVELOPMENT_MODE_TOOL,
  get_development_mode,
} from './site/development_mode'

import {
  site_record_list,
  SITE_RECORD_LIST_TOOL,
  create_site_mx_record,
  CREATE_SITE_MX_RECORD_TOOL,
  create_site_ns_record,
  CREATE_SITE_NS_RECORD_TOOL,
  create_site_txt_record,
  CREATE_SITE_TXT_RECORD_TOOL,
  create_site_cname_record,
  CREATE_SITE_CNAME_RECORD_TOOL,
  create_site_a_or_aaaa_record,
  CREATE_SITE_A_OR_AAAA_RECORD_TOOL,
} from './site/record';

export const ESA_OPENAPI_ER_LIST = [
  HTML_DEPLOY_TOOL,
  ROUTINE_CREATE_TOOL,
  ROUTINE_DELETE_TOOL,
  ROUTINE_LIST_TOOL,
  ROUTINE_GET_TOOL,
  ROUTINE_CODE_COMMIT_TOOL,
  ROUTINE_CODE_DEPLOY_TOOL,
  ROUTINE_ROUTE_LIST_TOOL,
  CANARY_AREA_LIST,
  DEPLOYMENT_DELETE_TOOL,
  SITE_ROUTE_LIST_TOOL,
  ROUTE_CREATE_TOOL,
  ROUTE_DELETE_TOOL,
  ROUTE_UPDATE_TOOL,
  ROUTE_GET_TOOL,
  ER_RECORD_CREATE_TOOL,
  ER_RECORD_DELETE_TOOL,
  ER_RECORD_LIST_TOOL,
];

export const ESA_OPENAPI_SITE_LIST = [
  SITE_ACTIVE_LIST_TOOL,
  SITE_MATCH_TOOL,
  CREATE_SITE_TOOL,
  UPDATE_SITE_PAUSE_TOOL,
  GET_SITE_PAUSE_TOOL,
  CHECK_SITE_NAME_TOOL,
  VERIFY_SITE_TOOL,
  GET_SITE_TOOL,
  LIST_SITES_TOOL,
  DELETE_SITE_TOOL,
  UPDATE_SITE_COVERAGE_TOOL,
]

export const ESA_OPENAPI_RECORD_LIST = [
  SITE_RECORD_LIST_TOOL,
  CREATE_SITE_MX_RECORD_TOOL,
  CREATE_SITE_NS_RECORD_TOOL,
  CREATE_SITE_TXT_RECORD_TOOL,
  CREATE_SITE_CNAME_RECORD_TOOL,
  CREATE_SITE_A_OR_AAAA_RECORD_TOOL,
]

export const ESA_OPENAPI_DEVELOPMENT_MODE_LIST = [
  GET_DEVELOPMENT_MODE_TOOL,
  UPDATED_EVELOPMENT_MODE_TOOL,
]

export const ESA_OPENAPI_LIST = [
  ...ESA_OPENAPI_ER_LIST, 
  ...ESA_OPENAPI_SITE_LIST,
  ...ESA_OPENAPI_RECORD_LIST,
  ...ESA_OPENAPI_DEVELOPMENT_MODE_LIST,
];
export const esaHandlers: ToolHandlers = {
  site_active_list,
  site_match,
  verify_site,
  list_sites,
  get_site,
  delete_site,
  update_site_coverage,
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
  html_deploy,
  create_site,
  update_site_pause,
  get_site_pause,
  create_site_mx_record,
  create_site_ns_record,
  create_site_txt_record,
  create_site_cname_record,
  create_site_a_or_aaaa_record,
  check_site_name,
  get_development_mode,
  update_development_mode,
};
