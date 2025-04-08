import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { ESA_OPENAPI_LIST, routineHandlers } from './tools/list-esa-function';
import { log } from './utils/helpers';

const server = new Server(
  {
    name: 'esa-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools: ESA_OPENAPI_LIST };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;
  log(
    'Received tool call:',
    toolName,
    'Params:',
    JSON.stringify(request.params),
  );
  return await routineHandlers[toolName](request);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('ESA MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
