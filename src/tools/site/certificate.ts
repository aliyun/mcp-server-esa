import {
  ApplyCertificateRequest,
  GetCertificateRequest,
  DeleteCertificateRequest,
  ListCertificatesRequest,
  GetCertificateQuotaRequest,
  SetCertificateRequest,
} from '@alicloud/esa20240910';
import api from '../../utils/service.js';
import { CallToolRequest, Tool } from '@modelcontextprotocol/sdk/types.js';

// Prompt:
export const SET_CERTIFICATE_TOOL: Tool = {
  name: 'set_certificate',
  description:
    'Configures whether to enable certificates and update certificate information for a website.',
  inputSchema: {
    type: 'object',
    properties: {
      siteId: {
        type: 'number',
        description: 'The website ID. Reference Value Source: list_sites',
        examples: ['123456****'],
      },
      name: {
        type: 'string',
        description: 'The name of the certificate.',
      },
      casId: {
        type: 'number',
        description: 'The ID of the cloud certificate.',
      },
      type: {
        type: 'string',
        description:
          'The type of certificate. Possible values: - cas (Cloud Certificate) - upload (Custom Upload Certificate)',
        enum: ['cas', 'upload'],
      },
      certificate: {
        type: 'string',
        description: 'The content of the certificate.',
      },
      privateKey: {
        type: 'string',
        description: 'The private key of the certificate.',
      },
      region: {
        type: 'string',
        description: 'The region.',
        example: 'cn-hangzhou',
      },
      id: {
        type: 'string',
        description: 'The ID of the certificate.',
        example: '30001303',
      },
    },
    required: ['siteId', 'type'],
    annotations: {},
  },
};

// Prompt:
export const APPLY_CERTIFICATE_TOOL: Tool = {
  name: 'apply_certificate',
  description: 'Applies for a free SSL certificate.',
  inputSchema: {
    type: 'object',
    properties: {
      siteId: {
        type: 'number',
        description:
          'Site ID. Example: 1234567890123. Reference Value Source: list_sites',
      },
      domains: {
        type: 'string',
        description:
          'The list of domain names, separated by commas. Example: "example.com,www.example.com"',
      },

      type: {
        type: 'string',
        description:
          "The type of certificate. Possible values: - lets_encrypt (Let's Encrypt certificate) - digicert_single (Digicert single-domain certificate) - digicert_wildcard (Digicert wildcard certificate)  ",
      },
    },
    required: ['siteId', 'domains', 'type'],
    annotations: {},
  },
};

// Prompt:
export const GET_CERTIFICATE_TOOL: Tool = {
  name: 'get_certificate',
  description:
    'Retrieve the certificate, private key, and certificate information',
  inputSchema: {
    type: 'object',
    properties: {
      siteId: {
        type: 'number',
        description: 'The website ID. Reference Value Source: list_sites',
      },
      id: {
        type: 'string',
        description:
          'Certificate ID. Example: babaded901474b9693acf530e0fb1d95',
      },
    },
    required: ['siteId', 'id'],
    annotations: {},
  },
};

// Prompt:
export const DELETE_CERTIFICATE_TOOL: Tool = {
  name: 'delete_certificate',
  description: 'Deletes a certificate for a website.',
  inputSchema: {
    type: 'object',
    properties: {
      siteId: {
        type: 'number',
        description:
          'The website ID, which can be obtained by calling the ListSites operation. Example: 1234567890123',
      },
      id: {
        type: 'string',
        description: 'The ID of the certificate. Example: 30001303',
      },
    },
    required: ['siteId', 'id'],
    annotations: {},
  },
};

// Prompt:
export const LIST_CERTIFICATES_TOOL: Tool = {
  name: 'list_certificates',
  description: 'Lists certificates of a website.',
  inputSchema: {
    type: 'object',
    properties: {
      siteId: {
        type: 'number',
        description:
          'The website ID. Reference Value Source: list_sites. Example: 1234567890123',
      },
      keyword: {
        type: 'string',
        description: 'The search keyword.',
      },
      validOnly: {
        type: 'boolean',
        description: 'Whether to return only valid certificates.',
      },
      pageNumber: {
        type: 'number',
        description: 'The page number of the returned data.',
      },
      pageSize: {
        type: 'number',
        description: 'The number of records per page.',
      },
    },
    required: ['siteId'],
    annotations: {},
  },
};

// Prompt:
export const GET_CERTIFICATE_QUOTA_TOOL: Tool = {
  name: 'get_certificate_quota',
  description: 'Query certificate quota and usage.',
  inputSchema: {
    type: 'object',
    properties: {
      siteId: {
        type: 'number',
        description:
          'The website ID. Reference Value Source: list_sites. Example: 1234567890123',
      },
      type: {
        type: 'string',
        description: 'The type of certificate quota. Example: free',
      },
    },
    required: ['siteId', 'type'],
    annotations: {},
  },
};

export const set_certificate = async (request: CallToolRequest) => {
  const res = await api.setCertificate(
    request.params.arguments as SetCertificateRequest,
  );

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const apply_certificate = async (request: CallToolRequest) => {
  const res = await api.applyCertificate(
    request.params.arguments as ApplyCertificateRequest,
  );

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const get_certificate = async (request: CallToolRequest) => {
  const res = await api.getCertificate(
    request.params.arguments as GetCertificateRequest,
  );

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const delete_certificate = async (request: CallToolRequest) => {
  const res = await api.deleteCertificate(
    request.params.arguments as DeleteCertificateRequest,
  );

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const list_certificates = async (request: CallToolRequest) => {
  const res = await api.listCertificates(
    request.params.arguments as ListCertificatesRequest,
  );

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};

export const get_certificate_quota = async (request: CallToolRequest) => {
  const res = await api.getCertificateQuota(
    request.params.arguments as GetCertificateQuotaRequest,
  );

  return {
    content: [{ type: 'text', text: JSON.stringify(res) }],
    success: true,
  };
};
