# n8n-nodes-linkedapi
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Official n8n community node for [Linked API](https://linkedapi.io) - LinkedIn automation and data extraction in your n8n automations.

## Installation

### n8n Cloud / Self-hosted
1. Go to **Settings** → **Community Nodes**
2. Enter: `n8n-nodes-linkedapi`
3. Click **Install**

### Manual
```bash
npm install n8n-nodes-linkedapi
```

## Credentials Setup

1. Get your tokens from [Linked API Platform](https://linkedapi.io):
   - **Linked API Token**: Platform access token
   - **Identification Token**: Account-specific token
![Get your tokens](https://linkedapi.io/content/images/2025/08/tokens.webp)


2. In n8n: **Credentials** → **Create New** → **Linked API**

## Available Operations

### Standard LinkedIn Operations

| Operation | Description | Key Parameters |
|-----------|-------------|----------------|
| **Check Connection Status** | Check connection status with another person | `personUrl` |
| **Comment on Post** | Leave a comment on a LinkedIn post | `postUrl`, `text` |
| **Fetch Company** | Get detailed company information | `companyUrl`, optional: employees, posts, decision makers |
| **Fetch Person** | Extract comprehensive LinkedIn profile data | `personUrl`, optional: experience, education, skills, posts, comments, reactions |
| **Fetch Post** | Retrieve detailed information about a LinkedIn post | `postUrl` |
| **React to Post** | React to a LinkedIn post | `postUrl`, `type` (like, celebrate, support, love, insightful, funny) |
| **Remove Connection** | Remove a person from your connections | `personUrl` |
| **Retrieve Connections** | Get your connections with filtering options | Optional filters: companies, industries, locations, position |
| **Retrieve Pending Requests** | Get pending connection requests you've sent | No parameters required |
| **Retrieve Performance** | Get LinkedIn dashboard analytics | No parameters required |
| **Retrieve SSI** | Get your Social Selling Index score | No parameters required |
| **Search Companies** | Search for companies on LinkedIn | Optional: `keywords`, filters for location, industry, size |
| **Search People** | Search for people on LinkedIn | Optional: `keywords`, filters for companies, industries, locations, schools |
| **Send Connection Request** | Send a connection request | `personUrl`, optional: `note`, `email` |
| **Send Message** | Send a message to a LinkedIn person | `personUrl`, `text` |
| **Sync Conversation** | Start polling a conversation for new messages | `personUrl` |
| **Withdraw Connection Request** | Withdraw a sent connection request | `personUrl`, optional: `unfollow` |

### Sales Navigator Operations

| Operation | Description | Key Parameters |
|-----------|-------------|----------------|
| **Fetch Company (Sales Navigator)** | Get company info in Sales Navigator | `companyHashedUrl`, optional: employees, decision makers |
| **Fetch Person (Sales Navigator)** | Get person info in Sales Navigator | `personHashedUrl` |
| **Search Companies (Sales Navigator)** | Advanced company search in Sales Navigator | Optional: `keywords`, filters for revenue, location, industry, size |
| **Search People (Sales Navigator)** | Advanced people search in Sales Navigator | Optional: `keywords`, filters for companies, experience, locations |
| **Send Message (Sales Navigator)** | Send message via Sales Navigator | `personUrl`, `text`, `subject` |
| **Sync Conversation (Sales Navigator)** | Start polling Sales Navigator conversation | `personUrl` |

### Other Operations

| Operation | Description | Key Parameters |
|-----------|-------------|----------------|
| **Custom Workflow** | Execute multi-step custom workflows | `definition` (workflow JSON) |
| **Get Workflow Result** | Get results from workflow execution | `workflowId`, `operationName` |

> **📖 Full Documentation**: [linkedapi.io/docs](https://linkedapi.io/docs/)

## License & Support

- **License**: MIT
- **Issues**: [GitHub](https://github.com/Linked-API/n8n-nodes-linkedapi/issues)
- **Docs**: [linkedapi.io/docs](https://linkedapi.io/docs/)
- **Email**: support@linkedapi.io
