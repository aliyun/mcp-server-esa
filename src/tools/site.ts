import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
import api from '../utils/service.js';
import {
  CreateRecordRequest,
  ListRecordsRequest,
  ListSitesRequest,
  UpdateSitePauseRequest,
  GetSitePauseRequest,
} from '@alicloud/esa20240910';
import { GetMatchSiteRequest } from '../utils/types.js';

export const SITE_ACTIVE_LIST_TOOL: Tool = {
  name: 'site_active_list',
  description: 'List all active sites',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const SITE_MATCH_TOOL: Tool = {
  name: 'site_match',
  description:
    'Identify which site in the account matches the provided input criteria.',
  inputSchema: {
    type: 'object',
    properties: {
      recordName: {
        type: 'string',
        description: 'The name of the site to match',
      },
    },
    required: ['recordName'],
  },
};

export const SITE_DNS_A_RECORD_CREATE_TOOL: Tool = {
  name: 'site_dns_a_record_create',
  description: 'Create an A DNS record for a specified site.',
  inputSchema: {
    type: 'object',
    properties: {
      recordName: {
        type: 'string',
        description:
          'The name of the DNS record (e.g., subdomain or full domain). Required.',
        examples: ['www.example.com', 'sub.example.com'],
      },
      siteId: {
        type: 'number',
        description:
          'The ID of the site, obtained from the ListSites operation. Required.',
        examples: [1234567890123],
      },
      data: {
        type: 'object',
        description:
          'The data for the DNS record, varying by record type. Required.',
        properties: {
          value: {
            type: 'string',
            description: 'The IP address of the A record. Required.',
            examples: ['2.2.2.2'],
          },
        },
      },
    },
    required: ['recordName', 'siteId', 'data'],
  },
};

export const SITE_DNS_CNAME_RECORD_CREATE_TOOL: Tool = {
  name: 'site_dns_cname_record_create',
  description: 'Create a CNAME DNS record for a specified site.',
  inputSchema: {
    type: 'object',
    properties: {
      recordName: {
        type: 'string',
        description:
          'The name of the DNS record (e.g., subdomain or full domain). Required.',
        examples: ['www.example.com', 'sub.example.com'],
      },
      siteId: {
        type: 'number',
        description:
          'The ID of the site, obtained from the ListSites operation. Required.',
        examples: [1234567890123],
      },
      data: {
        type: 'object',
        description:
          'The data for the DNS record, varying by record type. Required.',
        properties: {
          value: {
            type: 'string',
            description: 'The IP address of the A record. Required.',
            examples: ['2.2.2.2'],
          },
        },
      },
    },
    required: ['recordName', 'siteId', 'data'],
  },
};

export const SITE_RECORD_LIST_TOOL: Tool = {
  name: 'site_record_list',
  description: 'List DNS records associated with a specific site.',
  inputSchema: {
    type: 'object',
    properties: {
      SiteId: {
        type: 'number',
        description:
          'The ID of the site, obtained from the ListSites operation. Required.',
      },
    },
  },
};

export const UPDATE_SITE_PAUSE_TOOL: Tool = {
  name: 'update_site_pause',
  description: 'Modifies the ESA proxy configuration of a website.',
  inputSchema: {
    type: 'object',
    properties: {
      siteId: {
        type: 'number',
        description:
          'The website ID, which can be obtained by calling the [ListSites] operation.',
        examples: ['123456****'],
      },
      paused: {
        type: 'boolean',
        description:
          'Specifies whether to temporarily pause ESA on the website. If you set this parameter to true, all requests to the domains in your DNS records go directly to your origin server. Valid values: true, false',
        examples: ['true'],
      },
    },
    required: ['siteId', 'paused'],
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
};

export const GET_SITE_PAUSE_TOOL: Tool = {
  name: 'get_site_pause',
  description: 'Queries the ESA proxy configuration of a website.',
  inputSchema: {
    type: 'object',
    properties: {
      siteId: {
        type: 'number',
        description:
          'The website ID, which can be obtained by calling the [ListSites] operation.',
        examples: ['123456****'],
      },
    },
    required: ['siteId'],
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
};

export const site_dns_a_record_create = async (request: CallToolRequest) => {
  const res = await api.createRecord({
    ttl: 1,
    proxied: true,
    bizName: 'web',
    type: 'A/AAAA',
    ...request.params.arguments,
  } as CreateRecordRequest);
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(res),
      },
    ],
    success: true,
  };
};

export const site_dns_cname_record_create = async (
  request: CallToolRequest,
) => {
  const res = await api.createRecord({
    ttl: 1,
    proxied: true,
    bizName: 'web',
    type: 'CNAME',
    sourceType: 'Domain',
    hostPolicy: 'follow_hostname',

    ...request.params.arguments,
  } as CreateRecordRequest);
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(res),
      },
    ],
    success: true,
  };
};

export const site_record_list = async (request: CallToolRequest) => {
  const res = await api.listRecords({
    siteId: request.params.arguments?.SiteId ?? 0,
  } as ListRecordsRequest);
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(res),
      },
    ],
    success: true,
  };
};

export const site_active_list = async () => {
  const res = await api.listSites({
    siteSearchType: 'fuzzy',
    status: 'active',
    pageNumber: 1,
    pageSize: 500,
  } as ListSitesRequest);
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(res),
      },
    ],
    success: true,
  };
};

export const site_match = async (request: CallToolRequest) => {
  const res = await api.getMatchSite({
    recordName: request.params.arguments?.recordName ?? '',
  } as GetMatchSiteRequest);
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(res),
      },
    ],
    success: true,
  };
};

export const update_site_pause = async (request: CallToolRequest) => {
  const res = await api.updateSitePause(
    request.params.arguments as UpdateSitePauseRequest,
  );

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const get_site_pause = async (request: CallToolRequest) => {
  const res = await api.getSitePause(
    request.params.arguments as GetSitePauseRequest,
  );

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};
