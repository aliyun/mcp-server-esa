# ESA MCP Server

**ESA MCP Server is an implementation of the Model Context Protocol (MCP) server, designed to facilitate communication between AI models and Edge Security Acceleration (ESA) services. This server acts as a bridge, allowing models to leverage ESA features through a standardized protocol.**

---

[English](./readme.md) | [中文](./readme_zh.md)

## Installation

**Configure in your MCP-enabled client config:**

```
{
  "mcpServers": {
    "esa-mcp-server": {
      "command": "npx",
      "args": ["-y", "mcp-server-esa"],
      "env": {
        "ESA_ACCESS_KEY_ID": "your AK",
        "ESA_ACCESS_KEY_SECRET": "your SK"
      }
    }
  }
}
```

## Demo Videos

**Claude Demo**

![1744168230082](image/readme/1744168230082.gif)

![1744168440370](image/readme/1744168440370.gif)

**Cline Demo**

![1744168966418](image/readme/1744168966418.gif)

**Cline configured successfully:**

![1744114625974](image/readme/1744114625974.png)

**Claude configured successfully:**

![1744165412296](image/readme/1744165412296.png)

## Features

- **Implements Model Context Protocol for tool execution**
- **Provides access to ESA OpenAPI services**
- **Runs as a server via stdio for seamless integration with model runners**

## Tools List

**The server provides the following ESA tools callable via the MCP protocol:**

### Routine Management Tools

#### routine_create

**Create a Routine**

| **Parameter**   | **Type**   | **Required** | **Description**                                                                                                     |
| --------------- | ---------- | ------------ | ------------------------------------------------------------------------------------------------------------------- |
| **name**        | **string** | **Yes**      | **Routine name, supports lowercase letters, numbers, and hyphens, must start with a lowercase letter, min 2 chars** |
| **description** | **string** | **No**       | **Routine description, no spaces allowed**                                                                          |
| **code**        | **string** | **Yes**      | **Routine source code, e.g.:**`export default { async fetch(request) { return handleRequest(request); } }`          |

#### routine_delete

**Delete a Routine**

| **Parameter** | **Type**   | **Required** | **Description**                   |
| ------------- | ---------- | ------------ | --------------------------------- |
| **name**      | **string** | **Yes**      | **Name of the Routine to delete** |

#### routine_list

**List all Routines**

**No parameters required.**

#### routine_get

**Get Routine details**

| **Parameter** | **Type**   | **Required** | **Description**                  |
| ------------- | ---------- | ------------ | -------------------------------- |
| **name**      | **string** | **Yes**      | **Name of the Routine to query** |

---

### Deployment Tools

#### routine_code_commit

**Commit Routine code**

| **Parameter** | **Type**   | **Required** | **Description**         |
| ------------- | ---------- | ------------ | ----------------------- |
| **name**      | **string** | **Yes**      | **Routine name**        |
| **code**      | **string** | **Yes**      | **Routine source code** |

#### routine_code_deploy

**Deploy Routine code**

| **Parameter**         | **Type**   | **Required** | **Description**                                                           |
| --------------------- | ---------- | ------------ | ------------------------------------------------------------------------- |
| **name**              | **string** | **Yes**      | **Routine name**                                                          |
| **codeVersion**       | **string** | **Yes**      | **Routine version, must be valid semver**                                 |
| **env**               | **string** | **Yes**      | **Routine environment: "production" or "staging"**                        |
| **canaryAreaList**    | **array**  | **No**       | **Canary release areas, must be valid area names (see canary_area_list)** |
| **canaryCodeVersion** | **string** | **No**       | **Canary version, must be valid semver**                                  |

#### canary_area_list

**List all available canary areas for Routine deployment**

**No parameters required.**

#### deployment_delete

**Delete a deployment**

| **Parameter** | **Type**   | **Required** | **Description**     |
| ------------- | ---------- | ------------ | ------------------- |
| **name**      | **string** | **Yes**      | **Deployment name** |

### Route Management Tools

#### route_create

**Create a route for a Routine**

| **Parameter**   | **Type**   | **Required**         | **Description**                               |
| --------------- | ---------- | -------------------- | --------------------------------------------- |
| **siteId**      | **number** | **Yes**              | **Site ID**                                   |
| **mode**        | **string** | **Yes**              | **Route mode: 'simple' or 'custom'**          |
| **route**       | **string** | **Required by mode** | **Route path (required if mode is 'simple')** |
| **rule**        | **string** | **Yes**              | **Route rule (required if mode is 'custom')** |
| **routineName** | **string** | **Yes**              | **Routine name**                              |
| **routeName**   | **string** | **Yes**              | **Route name**                                |
| **bypass**      | **string** | **Yes**              | **Bypass: 'on' or 'off' (default 'off')**     |
| **routeEnable** | **string** | **Yes**              | **Enable: 'on' or 'off' (default 'on')**      |
| **sequence**    | **number** | **No**               | **Route sequence (default: current count)**   |

#### route_update

**Update a Routine route**

| **Parameter**   | **Type**   | **Required** | **Description**           |
| --------------- | ---------- | ------------ | ------------------------- |
| **siteId**      | **number** | **Yes**      | **Site ID**               |
| **configId**    | **number** | **Yes**      | **Config ID**             |
| **routeName**   | **string** | **Yes**      | **Route name**            |
| **routeEnable** | **string** | **Yes**      | **Enable: 'on' or 'off'** |
| **rule**        | **string** | **Yes**      | **Route rule**            |
| **routineName** | **string** | **Yes**      | **Routine name**          |
| **bypass**      | **string** | **Yes**      | **Bypass: 'on' or 'off'** |
| **sequence**    | **number** | **No**       | **Route sequence**        |

#### route_delete

**Delete a Routine route**

| **Parameter** | **Type**   | **Required** | **Description** |
| ------------- | ---------- | ------------ | --------------- |
| **siteId**    | **number** | **Yes**      | **Site ID**     |
| **configId**  | **number** | **Yes**      | **Config ID**   |

#### route_get

**Get a Routine-related route**

| **Parameter** | **Type**   | **Required** | **Description** |
| ------------- | ---------- | ------------ | --------------- |
| **siteId**    | **number** | **Yes**      | **Site ID**     |
| **configId**  | **number** | **Yes**      | **Config ID**   |

#### routine_route_list

**List all routes of a Routine**

| **Parameter**   | **Type**   | **Required** | **Description**                             |
| --------------- | ---------- | ------------ | ------------------------------------------- |
| **routineName** | **string** | **Yes**      | **Routine name**                            |
| **routeName**   | **string** | **No**       | **Route name, used to filter list results** |
| **pageNumber**  | **number** | **No**       | **Route page number**                       |
| **pageSize**    | **number** | **No**       | **Routes per page**                         |

#### site_route_list

**List all routes of a site**

| **Parameter**  | **Type**   | **Required** | **Description**                             |
| -------------- | ---------- | ------------ | ------------------------------------------- |
| **siteId**     | **number** | **Yes**      | **Site ID**                                 |
| **routeName**  | **string** | **No**       | **Route name, used to filter list results** |
| **pageNumber** | **number** | **No**       | **Route page number**                       |
| **pageSize**   | **number** | **No**       | **Routes per page**                         |

### Record Management Tools

#### er_record_create

**Create a record**

| **Parameter** | **Type**   | **Required** | **Description**        |
| ------------- | ---------- | ------------ | ---------------------- |
| name          | string     | Yes          | The name of the routine|
| siteId        | number     | Yes          | The ID of the site     |
| recordName    | string     | Yes          | The name of the record |

#### er_record_delete

**Delete a record**

| **Parameter** | **Type**   | **Required** | **Description**        |
| ------------- | ---------- | ------------ | ---------------------- |
| name          | string     | Yes          | The name of the routine|
| siteId        | number     | Yes          | The ID of the site     |
| recordName    | string     | Yes          | The name of the record |
| recordId      | number     | No           | The ID of the record   |

#### er_record_list

**List all records**

| **Parameter**    | **Type**   | **Required** | **Description**                |
| ---------------- | ---------- | ------------ | ------------------------------ |
| Name             | string     | Yes          | The name of the routine        |
| PageNumber       | number     | No           | The page number of the records |
| PageSize         | number     | No           | The page size of the records   |
| SearchKeyWord    | string     | No           | The search key word            |

### Site Tools

#### site_active_list

**List all active sites**

No parameters required.

#### site_match

**Check which site under the account matches the user input**

| Parameter  | Type   | Required | Description                   |
| ---------- | ------ | -------- | ----------------------------- |
| recordName | string | Yes      | The name of the site to match |

#### site_dns_type_a_record_create

**Create an A record for a site**

| Parameter  | Type   | Required | Description                                                        |
| ---------- | ------ | -------- | ------------------------------------------------------------------ |
| recordName | string | Yes      | The name of the DNS record (e.g., subdomain or full domain)        |
| siteId     | number | Yes      | The ID of the site, obtained from the ListSites operation          |
| data       | object | Yes      | The data for the DNS record, with value property                   |
| data.value | string | Yes      | The IP address of the A record (e.g., "2.2.2.2")                   |

#### site_dns_cname_domain_record_create

**Create a CNAME domain record for a site**

| Parameter  | Type   | Required | Description                                                        |
| ---------- | ------ | -------- | ------------------------------------------------------------------ |
| recordName | string | Yes      | The name of the DNS record (e.g., subdomain or full domain)        |
| siteId     | number | Yes      | The ID of the site, obtained from the ListSites operation          |
| data       | object | Yes      | The data for the DNS record, with value property                   |
| data.value | string | Yes      | The domain value for the CNAME record                              |

#### site_record_list

**List all records in a site**

| Parameter  | Type   | Required | Description                                                        |
| ---------- | ------ | -------- | ------------------------------------------------------------------ |
| SiteId     | number | Yes      | The ID of the site, obtained from the ListSites operation          |

##

## Available Scripts

- `npm run build` - Build the project using rslib
- `npm run dev` - Run build in watch mode for development
- `npm run format` - Format code using Prettier
- `npm run lint` - Check code using ESLint

### Project Structure

- `src/index.ts` - Main entry point
- `src/tools/` - ESA tool implementations
- `src/utils/` - Utilities and helpers

## License

**ISC**

## Contributions

**For Alibaba internal contributors, please follow the standard contribution workflow for the project.**
