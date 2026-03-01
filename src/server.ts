#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { ToolHandlers } from './utils/types';
import { log } from './utils/helpers';

export function createServer(
  name: string,
  tools: Tool[],
  handlers: ToolHandlers,
) {
  const server = new Server(
    {
      name,
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const toolName = request.params.name;
    log(
      'Received tool call:',
      toolName,
      'Params:',
      JSON.stringify(request.params),
    );
    return await handlers[toolName](request);
  });

  async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(`ESA MCP Server [${name}] running on stdio`);
  }

  main().catch((error) => {
    console.error('Fatal error in main():', error);
    process.exit(1);
  });
}
