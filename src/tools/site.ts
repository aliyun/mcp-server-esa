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

export const CREATE_A_OR_AAAA_RECORD_TOOL: Tool = {
  name: 'create_a_or_aaaa_record',
  description:
    'Creates a DNS record for a specific website. Only A/AAAA records are supported.',
  inputSchema: {
    type: 'object',
    properties: {
      siteId: {
        type: 'number',
        description:
          'The website ID, which can be obtained by calling the [ListSites] operation.',
        examples: [1234567890123],
      },
      recordName: {
        type: 'string',
        description: 'The record name.',
        examples: ['www.example.com'],
      },
      proxied: {
        type: 'boolean',
        description:
          'Specifies whether to proxy the record. Only CNAME and A/AAAA records can be proxied. Valid values:\n- true\n- false',
        examples: [true],
      },
      bizName: {
        type: 'string',
        description:
          'The business scenario of the record for acceleration. The parameter cannot be empty if your record is proxied. Valid values:\n- image_video\n- api\n- web',
        enum: ['image_video', 'api', 'web'],
        examples: ['web'],
      },
      ttl: {
        type: 'number',
        description:
          'The TTL of the record. Unit: seconds. If the value is 1, the TTL of the record is determined by the system. Default: 1.',
        examples: [1],
      },
      data: {
        type: 'object',
        description:
          'The DNS record information. The format of this field varies based on the record type. For more information, see https://www.alibabacloud.com/help/doc-detail/2708761.html',
        properties: {
          value: {
            type: 'string',
            description:
              'The IP address(es). Separate IP addresses with commas (,). You must have at least one IPv4 address. Required.',
            examples: [
              '123.123.123.123,2001:0db8:86a3:08d3:1319:8a2e:0370:7344',
            ],
          },
        },
      },
      comment: {
        type: 'string',
        description:
          'The comment of the record. The maximum length is 100 characters.',
      },
    },
    required: ['siteId', 'recordName', 'type', 'data'],
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: false,
    },
  },
};

export const CREATE_CNAME_RECORD_TOOL: Tool = {
  name: 'create_cname_record',
  description:
    'Creates a DNS record for a specific website. Only supports records with type=CNAME and sourceType=Domain.',
  inputSchema: {
    type: 'object',
    properties: {
      siteId: {
        type: 'number',
        description:
          'The website ID, which can be obtained by calling the [ListSites] operation.',
      },
      recordName: {
        type: 'string',
        description: 'The record name.',
        examples: ['www.example.com'],
      },
      sourceType: {
        type: 'string',
        description:
          'The origin type for the CNAME record. This parameter is required when you add a CNAME record. Valid values:\n- Domain: domain name\n\nIf you do not pass this parameter or if you leave its value empty, Domain is used by default.',
        enum: ['Domain'],
        examples: ['Domain'],
      },
      bizName: {
        type: 'string',
        description:
          'The business scenario of the record for acceleration. Leave the parameter empty if your record is not proxied. Valid values:\n- image_video\n- api\n- web',
        enum: ['image_video', 'api', 'web'],
        examples: ['web'],
      },
      ttl: {
        type: 'number',
        description:
          'The TTL of the record. Unit: seconds. If the value is 1, the TTL of the record is determined by the system. Default: 1.',
        examples: [1],
      },
      data: {
        type: 'object',
        description:
          'The DNS record information. The format of this field varies based on the record type. For more information, see https://www.alibabacloud.com/help/doc-detail/2708761.html',
        properties: {
          value: {
            type: 'string',
            description: 'The target domain name. Required.',
            example: ['origin.example.com'],
          },
        },
      },
      comment: {
        type: 'string',
        description:
          'The comment of the record. The maximum length is 100 characters.',
      },
      hostPolicy: {
        type: 'string',
        description:
          'The origin host policy. This policy takes effect when the record type is CNAME. Required. You can set the policy in two modes:\n- follow_hostname\n- follow_origin_domain',
        enum: ['follow_hostname', 'follow_origin_domain'],
        examples: ['follow_hostname'],
      },
    },
    required: ['siteId', 'recordName', 'type', 'data'],
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: false,
    },
  },
};

export const CREATE_TXT_RECORD_TOOL: Tool = {
  name: 'create_txt_record',
  description:
    'Creates a DNS record for a specific website. Only TXT records are supported.',
  inputSchema: {
    type: 'object',
    properties: {
      siteId: {
        type: 'number',
        description:
          'The website ID, which can be obtained by calling the [ListSites] operation.',
      },
      recordName: {
        type: 'string',
        description: 'The record name.',
        examples: ['www.example.com'],
      },
      ttl: {
        type: 'number',
        description:
          'The TTL of the record. Unit: seconds. If the value is 1, the TTL of the record is determined by the system. Default: 1.',
        examples: [1],
      },
      data: {
        type: 'object',
        description:
          'The DNS record information. The format of this field varies based on the record type. For more information, see https://www.alibabacloud.com/help/doc-detail/2708761.html',
        properties: {
          value: {
            type: 'string',
            description: 'A valid text string. Required.',
            example: ['xxxxxxxxxxxxxxxxxx'],
          },
        },
      },
      comment: {
        type: 'string',
        description:
          'The comment of the record. The maximum length is 100 characters.',
      },
    },
    required: ['siteId', 'recordName', 'type', 'data'],
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: false,
    },
  },
};

export const CREATE_NS_RECORD_TOOL: Tool = {
  name: 'create_ns_record',
  description:
    'Creates a DNS record for a specific website. Only NS records are supported.',
  inputSchema: {
    type: 'object',
    properties: {
      siteId: {
        type: 'number',
        description:
          'The website ID, which can be obtained by calling the [ListSites] operation.',
      },
      recordName: {
        type: 'string',
        description: 'The record name.',
        examples: ['www.example.com'],
      },
      ttl: {
        type: 'number',
        description:
          'The TTL of the record. Unit: seconds. If the value is 1, the TTL of the record is determined by the system. Default: 1.',
        examples: [1],
      },
      data: {
        type: 'object',
        description:
          'The DNS record information. The format of this field varies based on the record type. For more information, see https://www.alibabacloud.com/help/doc-detail/2708761.html',
        properties: {
          value: {
            type: 'string',
            description: 'The name servers for the domain name. Required.',
            example: ['ns.example.com'],
          },
        },
      },
      comment: {
        type: 'string',
        description:
          'The comment of the record. The maximum length is 100 characters.',
      },
    },
    required: ['siteId', 'recordName', 'type', 'data'],
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: false,
    },
  },
};

export const CREATE_MX_RECORD_TOOL: Tool = {
  name: 'create_mx_record',
  description:
    'Creates a DNS record for a specific website. Only MX records are supported.',
  inputSchema: {
    type: 'object',
    properties: {
      siteId: {
        type: 'number',
        description:
          'The website ID, which can be obtained by calling the [ListSites] operation.',
      },
      recordName: {
        type: 'string',
        description: 'The record name.',
        examples: ['www.example.com'],
      },
      bizName: {
        type: 'string',
        description:
          'The business scenario of the record for acceleration. Leave the parameter empty if your record is not proxied. Valid values:\n- image_video\n- api\n- web',
      },
      ttl: {
        type: 'number',
        description:
          'The TTL of the record. Unit: seconds. If the value is 1, the TTL of the record is determined by the system. Default: 1.',
        examples: [1],
      },
      data: {
        type: 'object',
        description:
          'The DNS record information. The format of this field varies based on the record type. For more information, see https://www.alibabacloud.com/help/doc-detail/2708761.html',
        properties: {
          value: {
            type: 'string',
            description:
              'A valid domain name of the target mail server. Required.',
            example: ['mx.example.com'],
          },
          priority: {
            type: 'number',
            description:
              'The priority of the record, specified within the range of 0 to 65,535. A smaller value indicates a higher priority. Required.',
          },
        },
      },
      comment: {
        type: 'string',
        description:
          'The comment of the record. The maximum length is 100 characters.',
      },
    },
    required: ['siteId', 'recordName', 'type', 'data'],
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: false,
    },
  },
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

export const create_a_or_aaaa_record = async (request: CallToolRequest) => {
  const req = request.params.arguments as CreateRecordRequest;

  req.proxied = req.proxied || false;
  req.type = req.type || 'A/AAAA';
  req.ttl = req.ttl || 1;

  if (req.type !== 'A/AAAA') {
    return {
      content: [{ type: 'text', text: 'type must be A/AAAA' }],
      success: false,
    };
  }

  const res = await api.createRecord(req);

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const create_cname_record = async (request: CallToolRequest) => {
  const req = request.params.arguments as CreateRecordRequest;

  req.type = req.type || 'CNAME';
  req.sourceType = req.sourceType || 'Domain';
  req.proxied = true;
  req.ttl = req.ttl || 1;
  if (req.type !== 'CNAME') {
    return {
      content: [{ type: 'text', text: 'type must be CNAME' }],
      success: false,
    };
  }

  if (req.sourceType !== 'Domain') {
    return {
      content: [{ type: 'text', text: 'sourceType must be Domain' }],
      success: false,
    };
  }

  const res = await api.createRecord(req);

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const create_txt_record = async (request: CallToolRequest) => {
  const req = request.params.arguments as CreateRecordRequest;

  req.type = req.type || 'TXT';
  req.ttl = req.ttl || 1;

  if (req.type !== 'TXT') {
    return {
      content: [{ type: 'text', text: 'type must be TXT' }],
      success: false,
    };
  }

  const res = await api.createRecord(req);

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const create_ns_record = async (request: CallToolRequest) => {
  const req = request.params.arguments as CreateRecordRequest;

  req.type = req.type || 'NS';
  req.ttl = req.ttl || 1;

  if (req.type !== 'NS') {
    return {
      content: [{ type: 'text', text: 'type must be NS' }],
      success: false,
    };
  }

  const res = await api.createRecord(req);

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const create_mx_record = async (request: CallToolRequest) => {
  const req = request.params.arguments as CreateRecordRequest;

  req.type = req.type || 'MX';
  req.ttl = req.ttl || 1;

  if (req.type !== 'MX') {
    return {
      content: [{ type: 'text', text: 'type must be MX' }],
      success: false,
    };
  }

  const res = await api.createRecord(req);

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};
