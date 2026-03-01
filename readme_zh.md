# ESA MCP Server

[![npm version](https://img.shields.io/npm/v/mcp-server-esa.svg)](https://www.npmjs.com/package/mcp-server-esa)
[![license](https://img.shields.io/npm/l/mcp-server-esa.svg)](./LICENSE)

阿里云 ESA 的 MCP 服务器 — 在 AI IDE 中一站式完成边缘部署、DNS 管理、证书配置和边缘函数管理。

[English](./readme.md) | [中文](./readme_zh.md)

## 特性

- 🚀 **Pages** — 一键部署 HTML 或静态目录（`dist/`、`build/`）到边缘
- ⚡ **边缘函数** — 完整生命周期管理：创建、提交、部署、路由、删除
- 🌐 **站点管理** — DNS 记录、SSL 证书、IPv6、托管转换、站点配置
- 🧩 **模块化** — 加载全部 40+ 工具，或按需选择单个模块
- 🔌 **广泛兼容** — 支持 Cursor、Claude Desktop、Cline 及所有 MCP 兼容客户端

## 快速开始

### 前置条件

1. 在[阿里云 AccessKey 页面](https://ram.console.aliyun.com/profile/access-keys)获取 AK 和 SK
2. 开通[边缘函数服务](https://esa.console.aliyun.com/edge/function/list)

### 配置

在 MCP 客户端中添加配置（如 Cursor `~/.cursor/mcp.json`、Claude Desktop、Cline）：

**Pages（推荐）** — 快速部署静态站点到边缘：

```json
{
  "mcpServers": {
    "esa-pages": {
      "command": "npx",
      "args": ["-y", "-p", "mcp-server-esa", "mcp-server-esa-pages"],
      "env": {
        "ALIBABA_CLOUD_ACCESS_KEY_ID": "your AK",
        "ALIBABA_CLOUD_ACCESS_KEY_SECRET": "your SK"
      }
    }
  }
}
```

**全量模式** — 包含 Pages、ER、Site 所有工具：

```json
{
  "mcpServers": {
    "esa-mcp-server": {
      "command": "npx",
      "args": ["-y", "mcp-server-esa"],
      "env": {
        "ALIBABA_CLOUD_ACCESS_KEY_ID": "your AK",
        "ALIBABA_CLOUD_ACCESS_KEY_SECRET": "your SK",
        "ALIBABA_CLOUD_SECURITY_TOKEN": "可选，使用 STS Token 时需要传入"
      }
    }
  }
}
```

**模块化模式** — 按需加载，启动更快：

| 模块 | 二进制名 | 适用场景 |
| ---- | -------- | -------- |
| **Pages** | `mcp-server-esa-pages` | 前端开发 — 部署 HTML / 静态文件到边缘 |
| **ER** | `mcp-server-esa-er` | 边缘开发 — 边缘函数完整生命周期管理 |
| **Site** | `mcp-server-esa-site` | 运维 / SRE — DNS、证书、IPv6、站点配置 |

> 运行指定模块：`npx -p mcp-server-esa <二进制名>`
> 固定版本：`npx -p mcp-server-esa@1.1.0 <二进制名>`


**边缘函数（ER）** — Serverless 边缘函数全生命周期管理：

```json
{
  "mcpServers": {
    "esa-er": {
      "command": "npx",
      "args": ["-y", "-p", "mcp-server-esa", "mcp-server-esa-er"],
      "env": {
        "ALIBABA_CLOUD_ACCESS_KEY_ID": "your AK",
        "ALIBABA_CLOUD_ACCESS_KEY_SECRET": "your SK"
      }
    }
  }
}
```

**站点管理（Site）** — DNS、证书、IPv6 及站点配置：

```json
{
  "mcpServers": {
    "esa-site": {
      "command": "npx",
      "args": ["-y", "-p", "mcp-server-esa", "mcp-server-esa-site"],
      "env": {
        "ALIBABA_CLOUD_ACCESS_KEY_ID": "your AK",
        "ALIBABA_CLOUD_ACCESS_KEY_SECRET": "your SK"
      }
    }
  }
}
```

**组合多个模块：**

```json
{
  "mcpServers": {
    "esa-pages": {
      "command": "npx",
      "args": ["-y", "-p", "mcp-server-esa", "mcp-server-esa-pages"],
      "env": {
        "ALIBABA_CLOUD_ACCESS_KEY_ID": "your AK",
        "ALIBABA_CLOUD_ACCESS_KEY_SECRET": "your SK"
      }
    },
    "esa-site": {
      "command": "npx",
      "args": ["-y", "-p", "mcp-server-esa", "mcp-server-esa-site"],
      "env": {
        "ALIBABA_CLOUD_ACCESS_KEY_ID": "your AK",
        "ALIBABA_CLOUD_ACCESS_KEY_SECRET": "your SK"
      }
    }
  }
}
```

## 演示

**Claude Desktop**

![Claude 演示 1](https://raw.githubusercontent.com/aliyun/mcp-server-esa/main/image/readme/1744168230082.gif)

![Claude 演示 2](https://raw.githubusercontent.com/aliyun/mcp-server-esa/main/image/readme/1744168440370.gif)

**Cline**

![Cline 演示](https://raw.githubusercontent.com/aliyun/mcp-server-esa/main/image/readme/1744168966418.gif)

**Cline 配置成功：**

![Cline 配置成功](https://raw.githubusercontent.com/aliyun/mcp-server-esa/main/image/readme/1744114625974.png)

**Claude Desktop 配置成功：**

![Claude 配置成功](https://raw.githubusercontent.com/aliyun/mcp-server-esa/main/image/readme/1744165412296.png)

## 工具列表

### Pages

| 工具 | 描述 |
| ---- | ---- |
| `html_deploy` | 部署 HTML 页面到 ESA Pages，返回默认访问 URL |
| `folder_deploy` | 部署本地静态文件目录（HTML/CSS/JS/图片等）到 ESA Pages，自动打包上传 |

### 边缘函数（ER）

| 类别 | 工具 | 描述 |
| ---- | ---- | ---- |
| 函数 | `routine_create` | 创建边缘函数 |
| | `routine_delete` | 删除边缘函数 |
| | `routine_list` | 列出所有边缘函数 |
| | `routine_get` | 获取边缘函数详情 |
| 部署 | `routine_code_commit` | 保存代码版本 |
| | `routine_code_deploy` | 部署代码版本到测试或生产环境 |
| | `deployment_delete` | 删除代码版本 |
| 路由 | `route_create` | 创建路由 |
| | `route_update` | 更新路由配置 |
| | `route_delete` | 删除路由 |
| | `route_get` | 获取路由详情 |
| | `routine_route_list` | 列出边缘函数的所有路由 |
| | `site_route_list` | 列出站点的所有路由 |
| 记录 | `er_record_create` | 创建边缘函数关联记录 |
| | `er_record_delete` | 删除关联记录 |
| | `er_record_list` | 列出边缘函数的所有关联记录 |

### 站点

| 类别 | 工具 | 描述 |
| ---- | ---- | ---- |
| 站点 | `list_sites` | 列出所有站点 |
| | `site_active_list` | 列出所有已激活站点 |
| | `site_match` | 查找匹配条件的站点 |
| | `create_site` | 创建站点 |
| | `get_site_pause` | 查询 ESA 代理配置 |
| | `update_site_pause` | 修改 ESA 代理配置 |
| DNS | `site_record_list` | 列出站点的 DNS 记录 |
| | `create_site_a_or_aaaa_record` | 创建 A/AAAA 记录 |
| | `create_site_cname_record` | 创建 CNAME 记录 |
| | `create_site_txt_record` | 创建 TXT 记录 |
| | `create_site_ns_record` | 创建 NS 记录 |
| | `create_site_mx_record` | 创建 MX 记录 |
| | `update_record` | 更新 DNS 记录 |
| | `get_record` | 查询 DNS 记录 |
| | `list_records` | 列出 DNS 记录 |
| | `delete_record` | 删除 DNS 记录 |
| IPv6 | `update_ipv6` | 修改 IPv6 配置 |
| | `get_ipv6` | 查询 IPv6 配置 |
| 托管转换 | `update_managed_transform` | 修改托管转换配置 |
| | `get_managed_transform` | 查询托管转换配置 |
| 证书 | `set_certificate` | 启用/更新站点证书 |
| | `apply_certificate` | 申请免费 SSL 证书 |
| | `get_certificate` | 获取证书详情 |
| | `delete_certificate` | 删除证书 |
| | `list_certificates` | 列出站点证书 |
| | `get_certificate_quota` | 查询证书配额 |

## Prompt 示例

```
写一个 2048 游戏并部署到边缘函数上，显示访问 URL。
帮我把 ./dist 目录部署到 ESA Pages 上。
列出我账户下的所有边缘函数。
删除 2025 年 5 月之后创建的边缘函数。
我的边缘函数 "hello-world" 的默认访问地址是什么？
为 test.example.com 创建一个 CNAME 记录，值设置为 example2.com。
为 test.example.com 创建一个 A 记录，值设置为 1.1.1.1。
帮我的站点 example.com 申请一个免费 SSL 证书。
查看我站点的 IPv6 配置。
编写一个五子棋 HTML 部署到 ER 中。
```

## 许可证

MIT
