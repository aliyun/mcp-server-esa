import { GetRoutineStagingCodeUploadInfoResponse } from '@alicloud/esa20240910';
import { IOssConfig } from './types';
import FormData from 'form-data';
import fetch from 'node-fetch';

export function log(...args: unknown[]) {
  const msg = `[DEBUG ${new Date().toISOString()}] ${args.join(' ')}\n`;
  process.stderr.write(msg);
}

export const uploadCodeToOSS = async (
  res: GetRoutineStagingCodeUploadInfoResponse,
  code: string,
) => {
  const ossConfig = res?.body?.ossPostConfig as IOssConfig;

  if (res.statusCode !== 200 || !ossConfig) {
    return false;
  }

  const { OSSAccessKeyId, Signature, callback, Url, key, policy }: IOssConfig =
    ossConfig;
  const formData = new FormData();
  formData.append('OSSAccessKeyId', OSSAccessKeyId);
  formData.append('Signature', Signature);
  formData.append('callback', callback);
  formData.append('x:codeDescription', ossConfig['x:codeDescription']);
  formData.append('policy', policy);
  formData.append('key', key);
  formData.append('file', code);

  const ossRes = await fetch(Url, {
    method: 'POST',
    body: formData,
    headers: formData.getHeaders(),
  });

  return ossRes && ossRes.status === 200;
};

/* 操作符号枚举 */
export enum OPERATOR_ENUM {
  Eq = 'eq',
  Ne = 'ne',
  Contains = 'contains',
  Negate_Contains = 'negate_contains',
  StartsWith = 'starts_with',
  Negate_StartsWith = 'negate_starts_with',
  EndsWith = 'ends_with',
  Negate_EndsWith = 'negate_ends_with',
  Matches = 'matches',
  Negate_Matches = 'negate_matches',
  In = 'in',
  Negate_In = 'negate_in',
  Gt = 'gt',
  Lt = 'lt',
  Ge = 'ge',
  Le = 'le',
  InList = 'in_list',
  Negate_InList = 'negate_in_list',
}
const RuleMatchTypeHost = 'http.host';
const RuleMatchTypeUriPath = 'http.request.uri.path';
const RuleMatchOperatorEq = OPERATOR_ENUM.Eq;
const RuleMatchOperatorStartsWith = OPERATOR_ENUM.StartsWith;
const RuleMatchOperatorEndsWith = OPERATOR_ENUM.EndsWith;

export const transferRouteToRuleString = (routePath: string): string => {
  if (!routePath) {
    return '';
  }

  const index = routePath.indexOf('/');
  let host = '';
  let uriPath = '';

  if (index < 0) {
    host = routePath;
    uriPath = '/';
  } else {
    host = routePath.substring(0, index);
    uriPath = routePath.substring(index);
  }

  let hostOperator = RuleMatchOperatorEq;
  if (host.startsWith('*')) {
    hostOperator = RuleMatchOperatorEndsWith;
    host = host.replace(/\*/g, '');
  }

  let uriPathOperator = RuleMatchOperatorEq;
  if (uriPath.endsWith('*')) {
    uriPathOperator = RuleMatchOperatorStartsWith;
    uriPath = uriPath.replace(/\*$/, '');
  }

  let ruleStr = '';
  if (hostOperator === RuleMatchOperatorEq) {
    if (uriPathOperator === RuleMatchOperatorEq) {
      ruleStr = `(${RuleMatchTypeHost} ${hostOperator} "${host}" and ${RuleMatchTypeUriPath} ${uriPathOperator} "${uriPath}")`;
    } else if (uriPathOperator === RuleMatchOperatorStartsWith) {
      ruleStr = `(${RuleMatchTypeHost} ${hostOperator} "${host}" and ${RuleMatchOperatorStartsWith}(${RuleMatchTypeUriPath}, "${uriPath}"))`;
    }
  } else if (hostOperator === RuleMatchOperatorEndsWith) {
    if (uriPathOperator === RuleMatchOperatorEq) {
      ruleStr = `(${RuleMatchOperatorEndsWith}(${RuleMatchTypeHost}, "${host}") and ${RuleMatchTypeUriPath} ${uriPathOperator} "${uriPath}")`;
    } else if (uriPathOperator === RuleMatchOperatorStartsWith) {
      ruleStr = `(${RuleMatchOperatorEndsWith}(${RuleMatchTypeHost}, "${host}") and ${RuleMatchOperatorStartsWith}(${RuleMatchTypeUriPath}, "${uriPath}"))`;
    }
  }
  return ruleStr;
};

export const transferRuleStringToRoute = (ruleStr: string): string => {
  if (!ruleStr) {
    return '';
  }
  // 去掉外层括号并按 " and " 分割
  const cleanedRule = ruleStr.replace(/^\(|\)$/g, '');
  const parts = cleanedRule.split(' and ');
  if (parts.length !== 2) {
    return '';
  }

  let host = '';
  let uriPath = '';

  // 处理host部分
  const hostPart = parts[0].trim();
  if (
    hostPart.startsWith(`${RuleMatchOperatorEndsWith}(${RuleMatchTypeHost},`)
  ) {
    // host匹配eq时的逻辑
    // ends_with(http.host, "value")
    const match = hostPart.match(/ends_with\(http\.host,\s*"([^"]+)"\)/);
    if (match) {
      host = `*${match[1]}`; // 加前缀 *
    }
  } else if (
    hostPart.startsWith(`${RuleMatchTypeHost} ${RuleMatchOperatorEq}`)
  ) {
    // host匹配eq时的逻辑
    // http.host eq "value"
    const match = hostPart.match(/http\.host eq "([^"]+)"/);
    if (match) {
      host = match[1];
    }
  }

  // 处理uriPath 部分
  const uriPathPart = parts[1].trim();
  if (
    uriPathPart.startsWith(
      `${RuleMatchOperatorStartsWith}(${RuleMatchTypeUriPath},`,
    )
  ) {
    // uriPath匹配startsWith时的逻辑
    // starts_with(http.request.uri.path, "value")
    const match = uriPathPart.match(
      /starts_with\(http\.request\.uri\.path,\s*"([^"]+)"\)/,
    );
    if (match) {
      uriPath = `${match[1]}*`; // 加后缀 *
    }
  } else if (
    uriPathPart.startsWith(`${RuleMatchTypeUriPath} ${RuleMatchOperatorEq}`)
  ) {
    // uriPath匹配eq时的逻辑
    // http.request.uri.path eq "value"
    const match = uriPathPart.match(/http\.request\.uri\.path eq "([^"]+)"/);
    if (match) {
      uriPath = match[1];
    }
  }

  if (!host || !uriPath) {
    return '';
  }

  return `${host}${uriPath}`;
};
