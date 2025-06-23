import {
  UpdateManagedTransformRequest,
  GetManagedTransformRequest,
} from '@alicloud/esa20240910';
import api from '../../utils/service.js';
import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';

export const UPDATE_MANAGED_TRANSFORM_TOOL: Tool = {
  name: 'update_managed_transform',
  description:
    'Modifies the configuration of managed transforms for your website.',
  inputSchema: {
    type: 'object',
    properties: {
      siteId: {
        type: 'number',
        description:
          'The website ID, which can be obtained by calling the ListSites operation.',
        example: [12228828888],
      },
      addClientGeolocationHeader: {
        type: 'string',
        description:
          'Specifies whether to include the header that indicates the geographical location of a client in an origin request.',
        enum: ['on', 'off'],
      },
      siteVersion: {
        type: 'number',
        description:
          'The version number of the website. You can use this parameter to specify a version of your website to apply the feature settings. By default, version 0 is used.',
        example: [0],
      },
      addRealClientIpHeader: {
        type: 'string',
        description:
          "Specifies whether to include the 'ali-real-client-ip' header that indicates the 's real IP address in an origin request.",
        enum: ['on', 'off'],
      },
      realClientIpHeaderName: {
        type: 'string',
        description: 'The actual client IP header name.',
        example: ['test_header'],
      },
    },
    required: ['siteId'],
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
    },
  },
};

export const GET_MANAGED_TRANSFORM_TOOL: Tool = {
  name: 'get_managed_transform',
  description: 'Query Managed Transform Configuration.',
  inputSchema: {
    type: 'object',
    properties: {
      siteId: {
        type: 'number',
        description: 'Site ID, which can be obtained by calling ListSites.',
        example: [12228828888],
      },
      siteVersion: {
        type: 'number',
        description:
          'The version number of the site. For sites with version management enabled, you can use this parameter to specify the effective version of the configuration, defaulting to version 0.',
        example: [0],
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

export const update_managed_transform = async (request: CallToolRequest) => {
  const res = await api.updateManagedTransform(
    request.params.arguments as UpdateManagedTransformRequest,
  );

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const get_managed_transform = async (request: CallToolRequest) => {
  const res = await api.getManagedTransform(
    request.params.arguments as GetManagedTransformRequest,
  );

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};
