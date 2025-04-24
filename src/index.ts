import { Server } from "@modelcontextprotocol/sdk/server/index.js";
// import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import express from "express";
import { ESA_OPENAPI_LIST, routineHandlers } from "./tools/list-esa-function";
import { log } from "./utils/helpers";
import { SSEServerTransport } from "./transport";
import ApiServerManager from "./utils/serverManager";
import { ApiServer } from "./utils/service";
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
  return { tools: ESA_OPENAPI_LIST };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request, extra) => {
  const toolName = request.params.name;
  const sessionId = extra.sessionId ?? "";
  const apiServer = await ApiServerManager.getApiServerById(sessionId);
  log(
    JSON.stringify(request),
    "Received tool call:",
    toolName,
    "Params:",
    JSON.stringify(request.params)
  );
  return await routineHandlers[toolName](
    request,
    apiServer as unknown as ApiServer
  );
});

let transport: SSEServerTransport | null = null;

app.get("/sse", async (req, res) => {
  const ak = req.query.ak;
  const sk = req.query.sk;
  log("Received SSE connection request");
  if (!ak || !sk) {
    res.status(400).send("Missing access key or secret key");
    return;
  }
  console.log("test");
  transport = new SSEServerTransport("/messages", res, String(ak), String(sk));

  server.connect(transport);
});

app.post("/messages", (req, res) => {
  if (transport) {
    transport.handlePostMessage(req, res);
  }
});

app.listen(3000);
