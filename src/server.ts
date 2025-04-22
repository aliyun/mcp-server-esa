import {
  isInitializeRequest,
  JSONRPCMessage,
  JSONRPCMessageSchema,
} from "@modelcontextprotocol/sdk/types.js";

export async function handleRequest(req, parsedBody) {
  if (req.method === "POST") {
    await handlePostRequest(req, parsedBody);
  } else if (req.method === "GET") {
    await handleGetRequest(req);
  } else if (req.method === "DELETE") {
    await handleDeleteRequest(req);
  } else {
    await handleUnsupportedRequest(req);
  }
}

const MAXIMUM_MESSAGE_SIZE = "4mb";

async function handlePostRequest(request: Request): Promise<Response> {
  try {
    // 1. 验证 Accept 头
    const acceptHeader = request.headers.get("accept") || "";
    if (
      !acceptHeader.includes("application/json") ||
      !acceptHeader.includes("text/event-stream")
    ) {
      return new Response(
        JSON.stringify({
          jsonrpc: "2.0",
          error: {
            code: -32000,
            message:
              "Not Acceptable: Client must accept both application/json and text/event-stream",
          },
          id: null,
        }),
        { status: 406, headers: { "Content-Type": "application/json" } }
      );
    }

    // 2. 验证 Content-Type
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return new Response(
        JSON.stringify({
          jsonrpc: "2.0",
          error: {
            code: -32000,
            message:
              "Unsupported Media Type: Content-Type must be application/json",
          },
          id: null,
        }),
        { status: 415, headers: { "Content-Type": "application/json" } }
      );
    }

    let rawMessage;
    try {
      rawMessage = await request.json();
    } catch (error) {
      return new Response(
        JSON.stringify({
          jsonrpc: "2.0",
          error: {
            code: -32700,
            message: "Parse error",
            data: String(error),
          },
          id: null,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4. 处理单条或批量消息
    let messages: JSONRPCMessage[];
    if (Array.isArray(rawMessage)) {
      messages = rawMessage.map((msg) => JSONRPCMessageSchema.parse(msg));
    } else {
      messages = [JSONRPCMessageSchema.parse(rawMessage)];
    }

    // 5. 检查是否为初始化请求
    const isInitializationRequest = messages.some(isInitializeRequest);
    if (isInitializationRequest) {
      if (this._initialized && this.sessionId !== undefined) {
        return new Response(
          JSON.stringify({
            jsonrpc: "2.0",
            error: {
              code: -32600,
              message: "Invalid Request: Server already initialized",
            },
            id: null,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      if (messages.length > 1) {
        return new Response(
          JSON.stringify({
            jsonrpc: "2.0",
            error: {
              code: -32600,
              message:
                "Invalid Request: Only one initialization request is allowed",
            },
            id: null,
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      this.sessionId = this.sessionIdGenerator?.();
      this._initialized = true;

      if (this.sessionId && this._onsessioninitialized) {
        this._onsessioninitialized(this.sessionId);
      }
    }

    // 6. 验证会话（非初始化请求）
    if (!isInitializationRequest && !this.validateSession(request)) {
      return new Response(
        JSON.stringify({
          jsonrpc: "2.0",
          error: {
            code: -32000,
            message: "Invalid Session: Mcp-Session-Id required",
          },
          id: null,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 7. 检查是否包含请求
    const hasRequests = messages.some(isJSONRPCRequest);

    if (!hasRequests) {
      // 仅包含通知或响应，返回 202
      for (const message of messages) {
        this.onmessage?.(message);
      }
      return new Response(null, { status: 202 });
    } else {
      // 包含请求，默认使用 SSE 流
      const streamId = randomUUID();
      let response: Response;

      if (!this._enableJsonResponse) {
        // 使用 SSE 流
        const headers: HeadersInit = {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        };
        if (this.sessionId) {
          headers["mcp-session-id"] = this.sessionId;
        }

        // 创建 SSE 流
        const { readable, writable } = new TransformStream();
        response = new Response(readable, { status: 200, headers });

        // 存储流
        this._streamMapping.set(streamId, writable);
        for (const message of messages) {
          if (isJSONRPCRequest(message)) {
            this._requestToStreamMapping.set(message.id, streamId);
          }
        }

        // 处理流关闭
        writable.getWriter().closed.catch(() => {
          this._streamMapping.delete(streamId);
        });
      } else {
        // 使用 JSON 响应（未实现具体逻辑，假设直接处理）
        // 这里可以扩展为同步 JSON 响应
        response = new Response(null, {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      // 处理消息
      for (const message of messages) {
        this.onmessage?.(message);
      }

      return response;
    }
  } catch (error) {
    // 返回 JSON-RPC 格式的错误
    this.onerror?.(error as Error);
    return new Response(
      JSON.stringify({
        jsonrpc: "2.0",
        error: {
          code: -32700,
          message: "Parse error",
          data: String(error),
        },
        id: null,
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function handleGetRequest(req) {}

export async function handleDeleteRequest(req) {}

export async function handleUnsupportedRequest(req) {}
