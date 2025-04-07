#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  CallToolRequest,
} from '@modelcontextprotocol/sdk/types.js';
import { log } from './utils/helpers.ts';
import {
  ESA_OPENAPI_LIST,
  routineHandlers,
} from './tools/list-esa-function.ts';

// Create server
const server = new Server(
  { name: 'cloudflare', version: '1.0.0' },
  { capabilities: { tools: {} } },
);

// Handle list tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  log('Received list tools request');
  return { tools: ESA_OPENAPI_LIST };
});

server.setRequestHandler(
  CallToolRequestSchema,
  async (request: CallToolRequest) => {
    const toolName = request.params.name;
    log(
      'Received tool call:',
      toolName,
      'Params:',
      JSON.stringify(request.params),
    );
    return await routineHandlers[toolName](request);
  },
);

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('ESA MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
