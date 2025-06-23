import { UpdateIPv6Request, GetIPv6Request } from '@alicloud/esa20240910';
import api from '../../utils/service.js';
import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';

export const UPDATE_IPV6_TOOL: Tool = {
  name: 'update_ipv6',
  description: 'Modifies the IPv6 configuration of a website.',
  inputSchema: {
    type: 'object',
    properties: {
      siteId: {
        type: 'number',
        description:
          'The website ID, which can be obtained by calling the ListSites operation.',
        example: [12228828888],
      },
      enable: {
        type: 'string',
        description: 'Specifies whether to enable IPv6.',
        enum: ['on', 'off'],
      },
      region: {
        type: 'string',
        description: 'Enable IPV6 in the region.',
        enum: ['x.x', 'cn.cn'],
      },
    },
    required: ['siteId', 'enable'],
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
    },
  },
};

export const GET_IPV6_TOOL: Tool = {
  name: 'get_ipv6',
  description: 'Queries the IPv6 configuration of a website.',
  inputSchema: {
    type: 'object',
    properties: {
      siteId: {
        type: 'number',
        description:
          'The website ID, which can be obtained by calling the ListSites operation.',
        example: [12228828888],
      },
    },
    required: ['siteId'],
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: false,
    },
  },
};

export const update_ipv6 = async (request: CallToolRequest) => {
  const res = await api.updateIPv6(
    request.params.arguments as UpdateIPv6Request,
  );

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const get_ipv6 = async (request: CallToolRequest) => {
  const res = await api.getIPv6(request.params.arguments as GetIPv6Request);

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};
