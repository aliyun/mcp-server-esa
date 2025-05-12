import z from 'zod';
import {
  Result,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { CreateRoutineRouteRequest } from '@alicloud/esa20240910';

export type ToolHandlers = Record<
  string,
  (request: z.infer<typeof CallToolRequestSchema>) => Promise<Result>
>;
export interface IOssConfig {
  OSSAccessKeyId: string;
  Signature: string;
  Url: string;
  callback: string;
  key: string;
  policy: string;
  'x:codeDescription': string;
}

export class CreateRoutineRouteRequestExt extends CreateRoutineRouteRequest {
  mode: 'simple' | 'custom';
  constructor(params: CreateRoutineRouteRequest) {
    super(params);
    this.mode = params.mode;
  }
}

export interface AuthConfig {
  accessKeyId?: string;
  accessKeySecret?: string;
  securityToken?: string;
}

export interface CliConfig {
  [key: string]: unknown;
  auth?: AuthConfig;
  endpoint?: string;
  lang?: string;
}

export interface GetMatchSiteRequest {
  recordName: string;
}
export interface GetMatchSiteResponse {
  code: string;
  data: { SiteId: number; SiteName: string };
}

export interface ListRoutineRelatedRecordsRequest {
  Name: string;
  PageNumber?: number;
  PageSize?: number;
  SearchKeyWord?: string;
}
export interface ListRoutineRelatedRecordsResponse {
  code: string;
  data: {
    RequestId: string;
    PageNumber: number;
    PageSize: number;
    TotalCount: number;
    RelatedRecords: {
      RecordName: string;
      SiteId: number;
      SiteName: string;
      RecordId: number;
    }[];
  };
}
export type Map = Record<string, unknown>;
