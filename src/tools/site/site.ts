import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
import api from '../../utils/service.js';
import {
  ListSitesRequest,
  CreateSiteRequest,
  UpdateSitePauseRequest,
  GetSitePauseRequest,
} from '@alicloud/esa20240910';
import { GetMatchSiteRequest } from '../../utils/types.js';

export const LIST_SITES_TOOL: Tool = {
  name: 'list_sites',
  description:
    '用于查询当前用户下的站点列表 ，包括站点的名称、状态、配置等信息。',
  inputSchema: {
    type: 'object',
    properties: {
      siteName: {
        type: 'string',
        description: '站点名称。用于查询的过滤条件。',
      },
      siteSearchType: {
        type: 'string',
        description:
          '站点名称的搜索匹配模式。默认为精确匹配，取值：; - **prefix**：前缀匹配。; - **suffix**：后缀匹配。; - **exact**：精确匹配。; - **fuzzy**：模糊匹配。',
        enum: ['suffix', 'exact', 'prefix', 'fuzzy'],
      },
      pageNumber: {
        type: 'number',
        description: '页码。默认值：**1**。',
      },
      pageSize: {
        type: 'number',
        description: '分页大小。默认值：**500**。',
      },
      tagFilter: {
        type: 'array',
        description: '标签过滤规则。',
        items: {
          type: 'object',
          properties: {
            key: {
              type: 'string',
              description: '标签键，用于查询的过滤条件。',
            },
            value: {
              type: 'string',
              description: '标签值，用于查询的过滤条件。',
            },
          },
        },
      },
      resourceGroupId: {
        type: 'string',
        description: '资源组ID。用于查询的过滤条件。',
      },
      status: {
        type: 'string',
        description: '站点状态。用于查询的过滤条件。',
      },
      onlyEnterprise: {
        type: 'boolean',
        description: '仅企业版，传**true**时代表仅查询企业版的站点。',
      },
      planSubscribeType: {
        type: 'string',
        description:
          '套餐订阅类型。取值：; - **basicplan**: 基础版。; - **standardplan**：标准版。; - **advancedplan**：高级版。; - **enterpriseplan**：企业版。',
      },
      coverage: {
        type: 'string',
        description:
          '加速区域。取值：; - **domestic**：仅中国内地。; - **global**：全球。; - **overseas**：全球（不包含中国内地）。',
      },
      accessType: {
        type: 'string',
        description:
          '接入类型。取值：; - **NS**：通过NS托管接入。; - **CNAME**：通过CNAME接入。',
      },
      orderBy: {
        type: 'string',
        description:
          '排序字段，默认按照创建时间排序，支持; - gmtCreate：站点创建时间; - visitTime：站点访问时间',
      },
    },
    annotations: {},
  },
};

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
export const list_sites = async (request: CallToolRequest) => {
  const res = await api.listSites(request.params.arguments as ListSitesRequest);

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
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
