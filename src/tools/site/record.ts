import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';
import api from '../../utils/service.js';
import { CreateRecordRequest, UpdateRecordRequest, DeleteRecordRequest, GetRecordRequest, ListRecordsRequest } from '@alicloud/esa20240910';

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

export const CREATE_SITE_A_OR_AAAA_RECORD_TOOL: Tool = {
  name: 'create_site_a_or_aaaa_record',
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

export const CREATE_SITE_CNAME_RECORD_TOOL: Tool = {
  name: 'create_site_cname_record',
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

export const CREATE_SITE_TXT_RECORD_TOOL: Tool = {
  name: 'create_site_txt_record',
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

export const CREATE_SITE_NS_RECORD_TOOL: Tool = {
  name: 'create_site_ns_record',
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
      required: ['siteId', 'recordName', 'type', 'data'],
      annotations: {
        readOnlyHint: false,
        destructiveHint: false,
        idempotentHint: false,
        openWorldHint: false,
      },
    },
  },
};

export const CREATE_SITE_MX_RECORD_TOOL: Tool = {
  name: 'create_site_mx_record',
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

export const UPDATE_RECORD_TOOL: Tool = {
  name: 'update_record',
  description:
    'This operation allows you to update multiple types of DNS records, including but not limited to A/AAAA, CNAME, NS, MX, TXT, CAA, SRV, and URI. You can modify the record content by providing the necessary fields such as Value, Priority, and Flag. For origins added in CNAME records such as OSS and S3, the API enables you to configure authentication details to ensure secure access. Usage notes: The record value (Value) must match the record type. For example, the CNAME record should correspond to the target domain name. You must specify a priority (Priority) for some record types, such as MX and SRV. You must specify specific fields such as Flag and Tag for CAA records. When you update security records such as CERT and SSHFP, you must accurately set fields such as Type and Algorithm.If your origin type is OSS or S3, configure the authentication details in AuthConf based on the permissions.',
  inputSchema: {
    type: 'object',
    properties: {
      recordId: {
        type: 'number',
        description: 'The record ID, which can be obtained by calling ListRecords .',
        examples: [1234567890123],
      },
      ttl: {
        type: 'number',
        description:
          'The TTL of the record. Unit: seconds. The range is 30 to 86,400, or 1. If the value is 1, the TTL of the record is determined by the system.',
        examples: [30],
      },
      proxied: {
        type: 'boolean',
        description:
          'Specifies whether to proxy the record. Only CNAME and A/AAAA records can be proxied. Valid values: true,false',
        enum: [true, false],
        examples: [true],
      },
      type: {
        type: 'string',
        description:
          'The type of the DNS record. For example, A/AAAA, TXT, MX, NS, SRV, CAA, CERT, SMIMEA, SSHFP, TLSA, URI or CNAME.',
        enum: ['A/AAA', 'TXT', 'MX', 'NS', 'SRV', 'CAA', 'CERT', 'SMIMEA', 'SSHFP', 'TLSA', 'URI', 'CNAME'],
        examples: ['A/AAA'],
      },
      data: {
        type: 'object',
        description:
          'The DNS record information. The format of this field varies based on the record type. For more information, see https://www.alibabacloud.com/help/doc-detail/2708761.html',
        properties: {
          value: {
            type: 'string',
            description:
              'The record value or part of the record content. This parameter is required when you add A/AAAA, CNAME, NS, MX, TXT, CAA, SRV, and URI records. It has different meanings based on different types of records:A/AAAA: the IP address(es). Separate multiple IPs with commas (,). You must have at least one IPv4 address. CNAME: the target domain name. NS: the name servers for the domain name. MX: a valid domain name of the target mail server. TXT: a valid text string. CAA: a valid domain name of the certificate authority. SRV: a valid domain name of the target host. URI: a valid URI string.',
            example: ['example.com'],
          },
          priority: {
            type: 'number',
            description:
              'The priority of the record, specified within the range of 0 to 65,535. A smaller value indicates a higher priority. This parameter is required when you add MX, SRV, and URI records.',
            example: [10],
          },
          flag: {
            type: 'number',
            description:
              'The flag bit of the record. The Flag for a CAA record indicates its priority and how it is processed, specified within the range of 0 to 255. This parameter is required when you add a CAA record.',
              example: [128],
          },
          tag: {
            type: 'string',
            description:
              'The label of the record. The Tag of a CAA record indicate its specific type and usage. This parameter is required when you add a CAA record.',
            example: ['issue'],
          },
          weight: {
            type: 'number',
            description:
              'The weight of the record, specified within the range of 0 to 65,535. This parameter is required when you add SRV or URI records.',
            example: [0],
          },
          port: {
            type: 'number',
            description:
              'The port of the record, specified within the range of 0 to 65,535. This parameter is required when you add an SRV record.',
            example: [0],
          },
          type: {
            type: 'number',
            description:
              'The certificate type of the record (in CERT records), or the public key type (in SSHFP records). This parameter is required when you add CERT or SSHFP records.',
            example: [0],
          },
          keyTag: {
            type: 'number',
            description:
              'The public key identification for the record, specified within the range of 0 to 65,535. This parameter is required when you add a CAA record.',
            example: [0],
          },
          algorithm: {
            type: 'number',
            description:
              'The encryption algorithm used for the record, specified within the range from 0 to 255. This parameter is required when you add CERT or SSHFP records.',
            example: [0],
          },
          certificate: {
            type: 'string',
            description:
              'The public key of the certificate. This parameter is required when you add CERT, SMIMEA, or TLSA records.',
            example: ['dGVzdGFkYWxrcw=='],
          },
          usage: {
            type: 'number',
            description:
              'The usage identifier of the record, specified within the range of 0 to 255. This parameter is required when you add SMIMEA or TLSA records.',
            example: [0],
          },
          selector: {
            type: 'number',
            description:
              'The type of certificate or public key, specified within the range of 0 to 255. This parameter is required when you add SMIMEA or TLSA records.',
            example: [0],
          },
          matchingType: {
            type: 'number',
            description:
              'The algorithm policy used to match or validate the certificate, specified within the range 0 to 255. This parameter is required when you add SMIMEA or TLSA records.',
            example: [0],
          },
          fingerprint: {
            type: 'string',
            description: 'The public key fingerprint of the record. This parameter is required when you add a SSHFP record.',
            example: ['abcdef1234567890'],
          },
        },
      },
      sourceType: {
        type: 'string',
        description:
          'The type of the origin for the CNAME record. This parameter is required when you add a CNAME record. Valid values: OSS : OSS origin. S3 : S3 origin. LB: Load Balancer origin. OP: origin in an origin pool. Domain: common domain name. If you leave the parameter empty or set its value as null, the default is Domain, which is common domain name.',
        enum: ['OSS', 'S3', 'LB', 'OP', 'Domain', 'IP'],
        examples: ['OSS'],
      },
      bizName: {
        type: 'string',
        description:
          'The business scenario of the record for acceleration. Leave the parameter empty if your record is not proxied. Valid values: video_image: video and image. api: API. web: web page.',
        enum: ['api', 'web', 'video_image'],
        examples: ['web'],
      },
      comment: {
        type: 'string',
        description: 'The comments of the record.',
        example: ['This is a remark.'],
      },
      authConf: {
        type: 'object',
        description: 'The origin authentication information of the CNAME record.',
        properties: {
          authType: {
            type: 'string',
            description:
              'The authentication type of the origin server. Different origins support different authentication types. The type of origin refers to the SourceType parameter in this operation. If the type of origin is OSS or S3, you must specify the authentication type of the origin. Valid values: public: public read. Select this value when the origin type is OSS or S3 and the origin access is public read. private: private read. Select this value when the origin type is S3 and the origin access is private read.private_same_account: private read under the same account. Select this value when the origin type is OSS, the origins belong to the same Alibaba Cloud account, and the origins have private read access.',
            enum: ['private', 'public', 'private_same_account', 'private_cross_account'],
            examples: ['private'],
          },
          secretKey: {
            type: 'string',
            description:
              'The secret access key of the account to which the origin server belongs. This parameter is required when the SourceType is OSS, and AuthType is private_same_account, or when the SourceType is S3 and AuthType is private.',
            example: ['u0Nkg5gBK*******QF5wvKMM504JUHt'],
          },
          accessKey: {
            type: 'string',
            description:
              'The access key of the account to which the origin server belongs. This parameter is required when the SourceType is OSS, and AuthType is private_same_account, or when the SourceType is S3 and AuthType is private.',
            example: ['VIxuvJSA2S03f******kp208dy5w7'],
          },
          region: {
            type: 'string',
            description:
              'The version of the signature algorithm. This parameter is required when the origin type is S3 and AuthType is private. The following two types are supported: v2 v4. If you leave this parameter empty, the default value v4 is used.',
            enum: ['v2', 'v4'],
            examples: ['v2'],
          },
          version: {
            type: 'string',
            description:
              'The region of the origin. If the origin type is S3, you must specify this value. You can get the region information from the official website of S3.',
            example: ['us-east-1'],
          },
        },
      },
      hostPolicy: {
        type: 'string',
        description:
          'The origin host policy. This policy takes effect when the record type is CNAME. You can set the policy in two modes: follow_hostname: match the requested domain name. follow_origin_domain: match the origin\'s domain name.',
        enum: ['follow_hostname', 'follow_origin_domain'],
        example: ['follow_hostname'],
      },
    },
    required: ['recordId', 'data'],
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
    },
  },
};

export const DELETE_RECORD_TOOL: Tool = {
  name: 'delete_record',
  description: 'Deletes a DNS record of a website based on the specified RecordId.',
  inputSchema: {
    type: 'object',
    properties: {
      recordId: {
        type: 'number',
        description: 'The record ID, which can be obtained by calling ListRecords .',
        examples: [1234567890123],
      },
    },
    required: ['recordId'],
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
    },
  },
};

export const LIST_RECORDS_TOOL: Tool = {
  name: 'list_records',
  description:
    'Queries a list of Domain Name System (DNS) records of a website, including the record value, priority, and authentication configurations. Supports filtering by specifying parameters such as RecordName and RecordMatchType.',
  inputSchema: {
    type: 'object',
    properties: {
      siteId: {
        type: 'number',
        description: 'The website ID, which can be obtained by calling the ListSites operation.',
        examples: [1234567890456],
      },
      recordName: {
        type: 'string',
        description: 'The record name. This parameter specifies a filter condition for the query.',
        examples: ['www.example.com'],
      },
      recordMatchType: {
        type: 'string',
        description:
          'The match mode to search for the record name. Default value: exact. Valid values: prefix: match by prefix.suffix: match by suffix. exact: exact match. fuzzy: fuzzy match.',
        examples: ['fuzzy'],
      },
      pageNumber: {
        type: 'number',
        description: 'The page number. Default value: 1.',
        examples: [1],
      },
      pageSize: {
        type: 'number',
        description: 'The number of entries per page. Default value: 500.',
        examples: [50],
      },
      sourceType: {
        type: 'string',
        description:
          'The origin type of the record. Only CNAME records can be filtered by using this field. Valid values: OSS: OSS bucket. S3: S3 bucket. LB: load balancer. OP: origin pool. Domain: domain name.',
        enum: ['OSS', 'S3', 'LB', 'OP', 'Domain', 'IP'],
        examples: ['OSS'],
      },
      bizName: {
        type: 'string',
        description:
          'The business scenario of the record for acceleration. Valid values: image_video: video and image. api: API.web: web page.',
        enum: ['api', 'web', 'video_image'],
        examples: ['web'],
      },
      proxied: {
        type: 'boolean',
        description:
          'Filters by whether the record is proxied. Valid values:true, false',
        enum: [true, false],
        examples: [true],
      },
      type: {
        type: 'string',
        description: 'The DNS record type.',
        enum: ['A/AAA', 'TXT', 'MX', 'NS', 'SRV', 'CAA', 'CERT', 'SMIMEA', 'SSHFP', 'TLSA', 'URI', 'CNAME'],
        examples: ['A/AAA'],
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

export const GET_RECORD_TOOL: Tool = {
  name: 'get_record',
  description:
    'Queries the configuration of a single DNS record, such as the record value, priority, and origin authentication setting (exclusive to CNAME records).',
  inputSchema: {
    type: 'object',
    properties: {
      recordId: {
        type: 'number',
        description: 'The record ID, which can be obtained by calling ListRecords.',
        examples: [1234567890123],
      },
    },
    required: ['recordId'],
    annotations: {
      readOnlyHint: true,
      destructiveHint: false,
      idempotentHint: false,
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

export const create_site_a_or_aaaa_record = async (
  request: CallToolRequest,
) => {
  const req = request.params.arguments as CreateRecordRequest;

  req.proxied = req.proxied || false;
  req.type = 'A/AAAA';
  req.ttl = req.ttl || 1;

  const res = await api.createRecord(req);

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const create_site_cname_record = async (request: CallToolRequest) => {
  const req = request.params.arguments as CreateRecordRequest;

  req.type = 'CNAME';
  req.sourceType = 'Domain';
  req.proxied = true;
  req.ttl = req.ttl || 1;

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

export const create_site_txt_record = async (request: CallToolRequest) => {
  const req = request.params.arguments as CreateRecordRequest;

  req.type = 'TXT';
  req.ttl = req.ttl || 1;

  const res = await api.createRecord(req);

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const create_site_ns_record = async (request: CallToolRequest) => {
  const req = request.params.arguments as CreateRecordRequest;

  req.type = 'NS';
  req.ttl = req.ttl || 1;
  const res = await api.createRecord(req);

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const create_site_mx_record = async (request: CallToolRequest) => {
  const req = request.params.arguments as CreateRecordRequest;

  req.type = 'MX';
  req.ttl = req.ttl || 1;

  const res = await api.createRecord(req);

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};


export const update_record = async (request: CallToolRequest) => {
  const req = request.params.arguments as UpdateRecordRequest;

  const res = await api.updateRecord(req);

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const delete_record = async (request: CallToolRequest) => {
  const req = request.params.arguments as DeleteRecordRequest;

  const res = await api.deleteRecord(req);

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const list_records = async (request: CallToolRequest) => {
  const req = request.params.arguments as ListRecordsRequest;

  const res = await api.listRecords(req);

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const get_record = async (request: CallToolRequest) => {
  const req = request.params.arguments as GetRecordRequest;

  const res = await api.getRecord(req);

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};