import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
import api from '../../utils/service.js';
import {
  ListRecordsRequest,
  ListSitesRequest,
  CreateSiteRequest,
} from '@alicloud/esa20240910';
import { GetMatchSiteRequest } from '../../utils/types.js';

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

export const CREATE_SITE_TOOL: Tool = {
  name: 'create_site',
  description:
    'Adds a website. Make sure that you have an available plan before you add a website. Make sure that your website domain name has an ICP filing if the location you want to specify covers the Chinese mainland.',
  inputSchema: {
    type: 'object',
    properties: {
      siteName: {
        type: 'string',
        description: 'The website name.',
        examples: ['example.com'],
      },
      coverage: {
        type: 'string',
        description:
          'The service location. Valid values:\n- domestic: the Chinese mainland\n- global: global\n- overseas: outside the Chinese mainland',
        enum: ['global', 'domestic', 'overseas'],
        examples: ['domestic'],
      },
      accessType: {
        type: 'string',
        description: 'The DNS setup. Valid values:\n- NS;\n- CNAME',
        enum: ['NS', 'CNAME'],
        examples: ['NS'],
      },
      instanceId: {
        type: 'string',
        description:
          'The instance ID, which can be obtained by calling the [ListUserRatePlanInstances] operation. Specify at least one of the instance ID and website ID. If you specify both of them, the instance ID is used.',
        examples: ['dbaudit-cn-nwy349jdb03'],
      },
      resourceGroupId: {
        type: 'string',
        description:
          'The ID of the resource group. If you leave this parameter empty, the system uses the default resource group ID.',
        examples: ['rg-acfmw4znnok****'],
      },
    },
    required: ['siteName', 'coverage', 'accessType', 'instanceId'],
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: false,
    },
  },
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

export const create_site = async (request: CallToolRequest) => {
  const res = await api.createSite(
    request.params.arguments as CreateSiteRequest,
  );

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};
