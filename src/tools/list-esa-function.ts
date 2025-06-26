import {
  er_record_create,
  ER_RECORD_CREATE_TOOL,
  er_record_delete,
  ER_RECORD_DELETE_TOOL,
  er_record_list,
  ER_RECORD_LIST_TOOL,
} from './er/record';
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
} from './er/route';
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
} from './er/routine';

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
  LIST_SITES_TOOL,
  list_sites,
} from './site/site';

import {
  site_record_list,
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
  update_record,
  UPDATE_RECORD_TOOL,
  DELETE_RECORD_TOOL,
  LIST_RECORDS_TOOL,
  GET_RECORD_TOOL,
  list_records,
  get_record,
  delete_record,
} from './site/record';
import {
  get_ipv6,
  GET_IPV6_TOOL,
  update_ipv6,
  UPDATE_IPV6_TOOL,
} from './site/ipv6';
import {
  get_managed_transform,
  GET_MANAGED_TRANSFORM_TOOL,
  update_managed_transform,
  UPDATE_MANAGED_TRANSFORM_TOOL,
} from './site/managedTransform';
import { ToolHandlers } from '../utils/types';
import { routine_code_deploy, ROUTINE_CODE_DEPLOY_TOOL } from './er/deploy';
import { deployment_delete, DEPLOYMENT_DELETE_TOOL } from './er/deployments';
import { ROUTINE_CODE_COMMIT_TOOL } from './er/commit';
import {
  apply_certificate,
  APPLY_CERTIFICATE_TOOL,
  delete_certificate,
  DELETE_CERTIFICATE_TOOL,
  get_certificate,
  get_certificate_quota,
  GET_CERTIFICATE_QUOTA_TOOL,
  GET_CERTIFICATE_TOOL,
  list_certificates,
  LIST_CERTIFICATES_TOOL,
  set_certificate,
  SET_CERTIFICATE_TOOL,
} from './site/certificate';

export const ESA_OPENAPI_ER_LIST = [
  HTML_DEPLOY_TOOL,
  ROUTINE_CREATE_TOOL,
  ROUTINE_DELETE_TOOL,
  ROUTINE_LIST_TOOL,
  ROUTINE_GET_TOOL,
  ROUTINE_CODE_COMMIT_TOOL,
  ROUTINE_CODE_DEPLOY_TOOL,
  ROUTINE_ROUTE_LIST_TOOL,
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
];

export const ESA_OPENAPI_SITE_LIST = [
  LIST_SITES_TOOL,
  CREATE_SITE_TOOL,
  UPDATE_SITE_PAUSE_TOOL,
  GET_SITE_PAUSE_TOOL,
  UPDATE_RECORD_TOOL,
  CREATE_SITE_MX_RECORD_TOOL,
  CREATE_SITE_NS_RECORD_TOOL,
  CREATE_SITE_TXT_RECORD_TOOL,
  CREATE_SITE_CNAME_RECORD_TOOL,
  CREATE_SITE_A_OR_AAAA_RECORD_TOOL,
  DELETE_RECORD_TOOL,
  LIST_RECORDS_TOOL,
  GET_RECORD_TOOL,
];

export const IPV6_LIST = [UPDATE_IPV6_TOOL, GET_IPV6_TOOL];

export const CERTIFICATE_LIST = [
  SET_CERTIFICATE_TOOL,
  APPLY_CERTIFICATE_TOOL,
  GET_CERTIFICATE_TOOL,
  DELETE_CERTIFICATE_TOOL,
  LIST_CERTIFICATES_TOOL,
  GET_CERTIFICATE_QUOTA_TOOL,
];

export const MANAGED_TRANSFORM_LIST = [
  UPDATE_MANAGED_TRANSFORM_TOOL,
  GET_MANAGED_TRANSFORM_TOOL,
];

export const ESA_OPENAPI_LIST = [
  ...ESA_OPENAPI_ER_LIST,
  ...ESA_OPENAPI_SITE_LIST,
  ...IPV6_LIST,
  ...CERTIFICATE_LIST,
  ...MANAGED_TRANSFORM_LIST,
];
export const esaHandlers: ToolHandlers = {
  site_active_list,
  site_match,
  site_route_list,
  site_record_list,
  routine_create,
  routine_delete,
  routine_list,
  routine_get,
  routine_code_deploy,
  routine_route_list,
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
  update_record,
  list_records,
  get_record,
  delete_record,
  update_ipv6,
  get_ipv6,
  update_managed_transform,
  get_managed_transform,
  set_certificate,
  apply_certificate,
  get_certificate,
  delete_certificate,
  list_certificates,
  get_certificate_quota,
  list_sites,
};
