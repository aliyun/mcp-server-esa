import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
import api from '../utils/service.js';
import {
  CreateRecordRequest,
  ListRecordsRequest,
  ListSitesRequest,
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
    'Check which site under the account matches the user input， user must input recordName',
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

export const SITE_DNS_TYPE_A_RECORD_CREATE_TOOL: Tool = {
  name: 'site_dns_type_a_record_create',
  description: 'Create a A record for a site.',
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

export const SITE_DNS_CNAME_DOMAIN_RECORD_CREATE_TOOL: Tool = {
  name: 'site_dns_cname_domain_record_create',
  description: 'Create a CNAME domain record for a site.',
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
  description: 'List all records in a site',
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

export const site_dns_type_a_record_create = async (
  request: CallToolRequest,
) => {
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

export const site_dns_cname_domain_record_create = async (
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
