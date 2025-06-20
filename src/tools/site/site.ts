import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
import api from '../../utils/service.js';
import {
  ListSitesRequest,
  CreateSiteRequest,
  UpdateSitePauseRequest,
  GetSitePauseRequest,
  CheckSiteNameRequest,
  VerifySiteRequest,
  GetSiteRequest,
  DeleteSiteRequest,
  UpdateSiteCoverageRequest,
} from '@alicloud/esa20240910';
import { GetMatchSiteRequest } from '../../utils/types.js';

export const SITE_ACTIVE_LIST_TOOL: Tool = {
  name: 'site_active_list',
  description: 'List all active sites.',
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

export const CHECK_SITE_NAME_TOOL: Tool = {
  name: "check_site_name",
  description: "Checks whether a specified website name is available.",
  inputSchema: {
    type: "object",
    properties: {
      siteName: {
        type: "string",
        description: "The website name.",
        examples: ['example.com'],
      },
    },
    required: ["siteName"],
    annotations: {
      readOnlyHint: true,
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

export const check_site_name = async (request: CallToolRequest) => {
  const res = await api.checkSiteName(
    request.params.arguments as CheckSiteNameRequest,
  );

  return {
    content: [{ type: "text", text: JSON.stringify(res) }],
    success: true,
  };
};

export const VERIFY_SITE_TOOL: Tool = {
  name: "verify_site",
  description:
    "Verifies the ownership of a website domain. Websites that pass the verification are automatically activated.",
  inputSchema: {
    type: "object",
    properties: {
      siteId: {
        type: "number",
        description: "The site ID, which can be obtained by calling the ListSites operation.",
      },
    },
    required: ["siteId"],
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: true,
      openWorldHint: false,
    },
  },
};

// Prompt:
export const GET_SITE_TOOL: Tool = {
  name: "get_site",
  description: "Queries information about a site based on the Site ID.",
  inputSchema: {
    type: "object",
    properties: {
      siteId: {
        type: "number",
        description: "The website ID, which can be obtained by calling the ListSites operation.",
      },
    },
    required: ["siteId"],
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: false,
    },
  },
};

// Prompt:
export const LIST_SITES_TOOL: Tool = {
  name: "list_sites",
  description:
    "Queries the information about websites in your account, such as the name, status, and configuration of each website.",
  inputSchema: {
    type: "object",
    properties: {
      siteName: {
        type: "string",
        description: "The website name. This parameter specifies a filter condition for the query.",
      },
      siteSearchType: {
        type: "string",
        description:
          "The match mode to search for the website name. Default value: exact. Valid values: prefix: match by prefix. suffix: match by suffix. exact: exact match. fuzzy: fuzzy match.",
        enum: ["suffix", "exact", "prefix", "fuzzy"],
      },
      pageNumber: {
        type: "number",
        description: "The page number. Default value: 1.",
      },
      pageSize: {
        type: "number",
        description: "The number of entries per page. Default value: 500.",
      },
      tagFilter: {
        type: "array",
        description: "The tag filtering rule.",
        items: {
          type: "object",
          properties: {
            key: {
              type: "string",
              description: "The tag key. This parameter specifies a filter condition for the query.",
            },
            value: {
              type: "string",
              description: "The tag value. This parameter specifies a filter condition for the query.",
            },
          },
        },
      },
      resourceGroupId: {
        type: "string",
        description: "The ID of the resource group. This parameter specifies a filter condition for the query.",
      },
      status: {
        type: "string",
        description: "The website status. This parameter specifies a filter condition for the query.",
      },
      onlyEnterprise: {
        type: "boolean",
        description: "Specifies whether to query only websites on Enterprise plans. Valid values: true and false.",
        enum: [true, false],
      },
      planSubscribeType: {
        type: "string",
        description:
          "The plan type. Valid values: basicplan: Entrance, standardplan: Pro, advancedplan: Premium, enterpriseplan: Enterprise",
        enum: ["basicplan", "standardplan", "advancedplan", "enterpriseplan"],
      },
      coverage: {
        type: "string",
        description:
          "The service location. Valid values: domestic: the Chinese mainland, global: global, overseas: outside the Chinese mainland",
        enum: ["domestic", "global", "overseas"],
      },
      accessType: {
        type: "string",
        description:
          "The DNS setup. Valid values:NS,CNAME",
        enum: ["NS", "CNAME"],
      },
      orderBy: {
        type: "string",
        description:
          "Sorting field. By default, it sorts by creation time, supporting the following options: gmtCreate: website creation time, visitTime: website visit time",
        enum: ["gmtCreate", "visitTime"],
      },
    },
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: false,
    },
  },
};

// Prompt:
export const DELETE_SITE_TOOL: Tool = {
  name: "delete_site",
  description: "Deletes a website based on the specified website ID.",
  inputSchema: {
    type: "object",
    properties: {
      siteId: {
        type: "number",
        description: "The website ID, which can be obtained by calling the ListSites operation.",
      },
    },
    annotations: {
      readOnlyHint: false,
      destructiveHint: true,
      idempotentHint: false,
      openWorldHint: false,
    },
  },
};

// Prompt:
export const UPDATE_SITE_COVERAGE_TOOL: Tool = {
  name: "update_site_coverage",
  description:
    "Modifies the service location for a single website. This updates the acceleration configuration of the website to adapt to changes in traffic distribution, and improve user experience in specific regions.",
  inputSchema: {
    type: "object",
    properties: {
      siteId: {
        type: "number",
        description: "The website ID. You can call the ListSites operation to obtain the ID.",
      },
      coverage: {
        type: "string",
        description:
          "The desired service location. Valid values: domestic: the Chinese mainland, global: global, overseas: outside the Chinese mainland",
        enum: ["domestic", "global", "overseas"],
      },
    },
    required: ["siteId", "coverage"],
    annotations: {},
  },
};

export const verify_site = async (request: CallToolRequest) => {
  const res = await api.verifySite(
    request.params.arguments as VerifySiteRequest,
  );

  return {
    content: [{ type: "text", text: JSON.stringify(res) }],
    success: true,
  };
};

export const get_site = async (request: CallToolRequest) => {
  const res = await api.getSite(request.params.arguments as GetSiteRequest);

  return {
    content: [{ type: "text", text: JSON.stringify(res) }],
    success: true,
  };
};

export const list_sites = async (request: CallToolRequest) => {
  const res = await api.listSites(request.params.arguments as ListSitesRequest);

  return {
    content: [{ type: "text", text: JSON.stringify(res) }],
    success: true,
  };
};

export const delete_site = async (request: CallToolRequest) => {
  const res = await api.deleteSite(
    request.params.arguments as DeleteSiteRequest,
  );

  return {
    content: [{ type: "text", text: JSON.stringify(res) }],
    success: true,
  };
};

export const update_site_coverage = async (request: CallToolRequest) => {
  const res = await api.updateSiteCoverage(
    request.params.arguments as UpdateSiteCoverageRequest,
  );

  return {
    content: [{ type: "text", text: JSON.stringify(res) }],
    success: true,
  };
};