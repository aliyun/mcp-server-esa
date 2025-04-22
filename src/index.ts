import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import express from "express";
import { ESA_OPENAPI_LIST, routineHandlers } from "./tools/list-esa-function";
import { log } from "./utils/helpers";

const app = express();

const server = new Server(
  {
    name: "example-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  log("list");
  return { tools: ESA_OPENAPI_LIST };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const toolName = request.params.name;
  log(
    "Received tool call:",
    toolName,
    "Params:",
    JSON.stringify(request.params)
  );
  return await routineHandlers[toolName](request);
});

let transport: SSEServerTransport | null = null;

app.get("/sse", (req, res) => {
  transport = new SSEServerTransport("/messages", res);
  server.connect(transport);
});

app.post("/messages", (req, res) => {
  if (transport) {
    transport.handlePostMessage(req, res);
  }
});

app.listen(3000);
