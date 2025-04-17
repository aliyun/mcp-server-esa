import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
import api from '../utils/service.js';
import { CreateRecordRequest, ListSitesRequest } from '@alicloud/esa20240910';
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

export const SITE_CREATE_DNS_TYPE_A_RECORD: Tool = {
  name: 'site_create_dns_type_a_record',
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
        data: {
          type: 'object',
          description:
            'The data for the DNS record, varying by record type. Required. See CreateRecordRequestData for field requirements per record type.',
        },
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

export const SITE_CREATE_DNS_CNAME_DOMAIN_RECORD: Tool = {
  name: 'site_create_dns_cname_domain_record',
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
        data: {
          type: 'object',
          description:
            'The data for the DNS record, varying by record type. Required. See CreateRecordRequestData for field requirements per record type.',
        },
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

// export const SITE_CREATE_DNS_RECORD_TOOL: Tool = {
//   name: 'site_create_dns_record',
//   description:
//     'Create a DNS record for a site. Supports various DNS record types such as A/AAAA, CNAME, MX, TXT, and more, with optional proxying and origin authentication.',
//   inputSchema: {
//     type: 'object',
//     properties: {
//       recordName: {
//         type: 'string',
//         description:
//           'The name of the DNS record (e.g., subdomain or full domain). Required.',
//         examples: ['www.example.com', 'sub.example.com'],
//       },
//       siteId: {
//         type: 'number',
//         description:
//           'The ID of the site, obtained from the ListSites operation. Required.',
//         examples: [1234567890123],
//       },
//       type: {
//         type: 'string',
//         description:
//           'The type of the DNS record. Required. Valid values: A, AAAA, CNAME, MX, TXT, NS, CAA, SRV, URI, CERT, SSHFP, SMIMEA, TLSA.',
//         enum: [
//           'A',
//           'AAAA',
//           'CNAME',
//           'MX',
//           'TXT',
//           'NS',
//           'CAA',
//           'SRV',
//           'URI',
//           'CERT',
//           'SSHFP',
//           'SMIMEA',
//           'TLSA',
//         ],
//         examples: ['A', 'CNAME', 'MX'],
//       },
//       sourceType: {
//         type: 'string',
//         description:
//           'The type of origin for CNAME records. Required for CNAME records; defaults to "Domain" if not specified. Valid values: OSS, S3, LB, OP, Domain.',
//         enum: ['OSS', 'S3', 'LB', 'OP', 'Domain'],
//         examples: ['OSS', 'Domain'],
//       },
//       data: {
//         type: 'object',
//         description:
//           'The data for the DNS record, varying by record type. Required. See CreateRecordRequestData for field requirements per record type.',
//         properties: {
//           algorithm: {
//             type: 'number',
//             description:
//               'The encryption algorithm for CERT or SSHFP records (0-255). Required for CERT, SSHFP.',
//             minimum: 0,
//             maximum: 255,
//             examples: [1],
//           },
//           certificate: {
//             type: 'string',
//             description:
//               'The public key of the certificate for CERT, SMIMEA, or TLSA records. Required for these types.',
//             examples: ['dGVzdGFkYWxrcw=='],
//           },
//           fingerprint: {
//             type: 'string',
//             description:
//               'The public key fingerprint for SSHFP records. Required for SSHFP.',
//             examples: ['abcdef1234567890'],
//           },
//           flag: {
//             type: 'number',
//             description:
//               'The flag bit for CAA records, indicating priority (0-255). Required for CAA.',
//             minimum: 0,
//             maximum: 255,
//             examples: [128],
//           },
//           keyTag: {
//             type: 'number',
//             description:
//               'The public key identification for CAA records (0-65535). Required for CAA.',
//             minimum: 0,
//             maximum: 65535,
//             examples: [0],
//           },
//           matchingType: {
//             type: 'number',
//             description:
//               'The algorithm policy for SMIMEA or TLSA records (0-255). Required for these types.',
//             minimum: 0,
//             maximum: 255,
//             examples: [1],
//           },
//           port: {
//             type: 'number',
//             description:
//               'The port for SRV records (0-65535). Required for SRV.',
//             minimum: 0,
//             maximum: 65535,
//             examples: [0],
//           },
//           priority: {
//             type: 'number',
//             description:
//               'The priority for MX, SRV, or URI records (0-65535, lower is higher priority). Required for these types.',
//             minimum: 0,
//             maximum: 65535,
//             examples: [10],
//           },
//           selector: {
//             type: 'number',
//             description:
//               'The certificate or public key type for SMIMEA or TLSA records (0-255). Required for these types.',
//             minimum: 0,
//             maximum: 255,
//             examples: [1],
//           },
//           tag: {
//             type: 'string',
//             description:
//               'The label for CAA records. Required for CAA. Valid values: issue, issuewild, iodef.',
//             enum: ['issue', 'issuewild', 'iodef'],
//             examples: ['issue'],
//           },
//           type: {
//             type: 'number',
//             description:
//               'The certificate type (CERT) or public key type (SSHFP). Required for CERT, SSHFP.',
//             examples: [1], // Assuming numeric representation; adjust if string like 'RSA' is expected
//           },
//           usage: {
//             type: 'number',
//             description:
//               'The usage identifier for SMIMEA or TLSA records (0-255). Required for these types.',
//             minimum: 0,
//             maximum: 255,
//             examples: [1],
//           },
//           value: {
//             type: 'string',
//             description:
//               'The record value. Required for A/AAAA, CNAME, NS, MX, TXT, CAA, SRV, URI. Format varies by type (e.g., IP for A/AAAA, domain for CNAME).',
//             examples: ['2.2.2.2', 'example.com', 'mail.example.com'],
//           },
//           weight: {
//             type: 'number',
//             description:
//               'The weight for SRV or URI records (0-65535). Required for these types.',
//             minimum: 0,
//             maximum: 65535,
//             examples: [0],
//           },
//         },
//         additionalProperties: false,
//         examples: [
//           { value: '2.2.2.2' }, // A record
//           { value: 'example.com', priority: 10 }, // MX record
//           { tag: 'issue', value: 'ca.example.com', flag: 128, keyTag: 0 }, // CAA record
//         ],
//       },
//       ttl: {
//         type: 'number',
//         description:
//           'The TTL of the record in seconds. Set to 1 for system-determined TTL.',
//         minimum: 1,
//         examples: [30, 1],
//       },
//       authConf: {
//         type: 'object',
//         description:
//           'Origin authentication information for CNAME records. Required for OSS or S3 origins with specific auth types.',
//         properties: {
//           accessKey: {
//             type: 'string',
//             description:
//               'The access key for OSS (private_cross_account) or S3 (private) origins.',
//             examples: ['u0Nkg5gBK*******QF5wvKMM504JUHt'],
//           },
//           authType: {
//             type: 'string',
//             description:
//               'The authentication type for OSS or S3 origins. Valid values: public, private, private_same_account, private_cross_account.',
//             enum: [
//               'public',
//               'private',
//               'private_same_account',
//               'private_cross_account',
//             ],
//             examples: ['private'],
//           },
//           region: {
//             type: 'string',
//             description:
//               'The region of the S3 origin. Required for S3 origins.',
//             examples: ['us-east-1'],
//           },
//           secretKey: {
//             type: 'string',
//             description:
//               'The secret access key for OSS (private_same_account) or S3 (private) origins.',
//             examples: ['VIxuvJSA2S03f******kp208dy5w7'],
//           },
//           version: {
//             type: 'string',
//             description:
//               'The signature algorithm version for S3 (private). Valid values: v2, v4. Defaults to v4.',
//             enum: ['v2', 'v4'],
//             examples: ['v4'],
//           },
//         },
//         additionalProperties: false,
//         examples: [
//           { authType: 'public' },
//           {
//             authType: 'private',
//             accessKey: 'u0Nkg5gBK*******QF5wvKMM504JUHt',
//             secretKey: 'VIxuvJSA2S03f******kp208dy5w7',
//             region: 'us-east-1',
//             version: 'v4',
//           },
//         ],
//       },
//       proxied: {
//         type: 'boolean',
//         description:
//           'Whether to proxy the record. Only applicable for CNAME and A/AAAA records.',
//         examples: [true, false],
//       },
//       hostPolicy: {
//         type: 'string',
//         description:
//           'The origin host policy for CNAME records. Valid values: follow_hostname, follow_origin_domain.',
//         enum: ['follow_hostname', 'follow_origin_domain'],
//         examples: ['follow_origin_domain'],
//       },
//       bizName: {
//         type: 'string',
//         description:
//           'The business scenario for acceleration. Leave empty if not proxied. Valid values: image_video, api, web.',
//         enum: ['image_video', 'api', 'web'],
//         examples: ['web'],
//       },
//       comment: {
//         type: 'string',
//         description:
//           'A comment for the record. Maximum length is 100 characters.',
//         maxLength: 100,
//         examples: ['This is a remark.'],
//       },
//     },
//     required: ['recordName', 'siteId', 'type', 'data', 'ttl'],
//     additionalProperties: false,
//   },
// };

export const site_create_dns_type_a_record = async (
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

export const site_create_dns_cname_domain_record = async (
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
