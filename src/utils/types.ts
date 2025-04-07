import z from 'zod';
import {
  Result,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

export type ToolHandlers = Record<
  string,
  (request: z.infer<typeof CallToolRequestSchema>) => Promise<Result>
>;
export interface IOssConfig {
  OSSAccessKeyId: string;
  Signature: string;
  Url: string;
  callback: string;
  key: string;
  policy: string;
  'x:codeDescription': string;
}
