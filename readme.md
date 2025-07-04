-

# ESA MCP Server

An MCP server to conveniently use various Alibaba Cloud ESA services.

---

[English](./readme.md) | [中文](./readme_zh.md)

## Installation

1. **Apply for Alibaba Cloud's AK and SK on the Accesskey page**

https://ram.console.aliyun.com/profile/access-keys

2. **Enable Edge Routine service**

https://esa.console.aliyun.com/edge/function/list

3. **Configure in your MCP-enabled client config:**

```
{
  "mcpServers": {
    "esa-mcp-server": {
      "command": "npx",
      "args": ["-y", "mcp-server-esa"],
      "env": {
        "ALIBABA_CLOUD_ACCESS_KEY_ID": "your AK",
        "ALIBABA_CLOUD_ACCESS_KEY_SECRET": "your SK",
        "ALIBABA_CLOUD_SECURITY_TOKEN": "sts_security_token optional, required when using STS Token (By default, no need to pass)"
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

## Tools List

**The server provides the following ESA tools callable via the MCP protocol:**

| Category        | Tool                         | Description                                                                                 |
| --------------- | ---------------------------- | ------------------------------------------------------------------------------------------- |
| **HTML**        | html_deploy                  | Quick deploy a HTML in a new Edge Routine (ER)                                              |
| **Routines**    | routine_create               | Create a new Edge Routine (ER) in your Alibaba Cloud account.                               |
|                 | routine_delete               | Delete an existing Edge Routine (ER) from your Alibaba Cloud account.                       |
|                 | routine_list                 | List all Edge Routines (ERs) in your Alibaba Cloud account.                                 |
|                 | routine_get                  | Get a the details of a Edge Routine (ER).                                                   |
| **Deployments** | routine_code_commit          | Save a code version for future modifications or release within an Edge Routine (ER).        |
|                 | routine_code_deploy          | Deploy a selected code version to the staging or production environment.                    |
|                 | deployment_delete            | Delete a specified code version associated with an Edge Routine (ER).                       |
| **Routes**      | route_create                 | Create a new route associated with an Edge Routine (ER).                                    |
|                 | route_update                 | Modify the configuration of an existing Edge Routine route.                                 |
|                 | route_delete                 | Delete a specified route associated with an Edge Routine (ER).                              |
|                 | route_get                    | Get details of a specific route associated with an Edge Routine (ER).                       |
|                 | routine_route_list           | List all routes associated with a specific Edge Routine (ER).                               |
|                 | site_route_list              | List all routes associated with a specific site.                                            |
| **Records**     | er_record_create             | Create a new record related to an Edge Routine (ER).                                        |
|                 | er_record_delete             | Delete a specified record associated with an Edge Routine (ER).                             |
|                 | er_record_list               | List all records associated with a specific Edge Routine (ER).                              |
| **Sites**       | site_active_list             | List all active sites registered in your Alibaba Cloud account.                             |
|                 | site_match                   | Identify which site in the account matches the provided input criteria.                     |
|                 | site_record_list             | List DNS records associated with a specific site.                                           |
|                 | create_site_a_or_aaaa_record | Creates an A or AAAA DNS record for a specific website.                                     |
|                 | create_site_cname_record     | Creates a CNAME DNS record for a specific website.                                          |
|                 | create_site_txt_record       | Creates a TXT DNS record for a specific website.                                            |
|                 | create_site_ns_record        | Creates an NS DNS record for a specific website.                                            |
|                 | create_site_mx_record        | Creates an MX DNS record for a specific website.                                            |
|                 | get_site_pause               | Queries the ESA proxy configuration of a website.                                           |
|                 | update_site_pause            | Modifies the ESA proxy configuration of a website.                                          |
|                 | create_site                  | Adds a website.                                                                             |
|                 | update_record                | This operation allows you to update multiple types of DNS records.                          |
|                 | get_record                   | Queries the configuration of a single DNS record.                                           |
|                 | list_record                  | Queries a list of Domain Name System (DNS) records of a website.                            |
|                 | delete_record                | Deletes a DNS record of a website based on the specified RecordId.                          |
|                 | update_ipv6                  | Modifies the IPv6 configuration of a website.                                               |
|                 | get_ipv6                     | Queries the IPv6 configuration of a website.                                                |
|                 | update_managed_transform     | Modifies the configuration of managed transforms for your website.                          |
|                 | get_managed_transform        | Query Managed Transform Configuration.                                                      |
|                 | list_sites                   | List all sites registered in your Alibaba Cloud account.                                    |
| **Certificate** | set_certificate              | Configures whether to enable certificates and update certificate information for a website. |
|                 | apply_certificate            | Applies for a free SSL certificate.                                                         |
|                 | get_certificate              | Retrieve the certificate, private key, and certificate information                          |
|                 | delete_certificate           | Deletes a certificate for a website.                                                        |
|                 | list_certificates            | Lists certificates of a website.                                                            |
|                 | get_certificate_quota        | Query certificate quota and usage.                                                          |

## Prompt Examples

- Write a 2048 game and deploy it on Edge Routine, and display the default access URL provided by the Edge Routine.
- Delete Edge routines created after May 2025.
- List all Edge routines are under my account.
- What is the default access address for my Edge Routine named "hello-world"?
- Create a CNAME record for `test.example.com` with the value set to `example2.com`
- Create a A record for `test.example.com` with the value set to `1.1.1.1`

## License

MIT
