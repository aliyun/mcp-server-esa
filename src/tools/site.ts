import { Tool } from '@modelcontextprotocol/sdk/types.js';
import api from '../utils/service.js';
import { ListSitesRequest } from '@alicloud/esa20240910';

export const SITE_ACTIVE_LIST_TOOL: Tool = {
  name: 'site_active_list',
  description: 'List all active sites',
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

export const site_active_list = async () => {
  const res = await api.listSites({
    siteSearchType: 'fuzzy',
    status: 'active',
    pageNumber: 1,
    pageSize: 500,
  } as ListSitesRequest);
  return { result: JSON.stringify(res), success: true };
};
