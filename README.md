# n8n-nodes-linked-api
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Official n8n community node for [Linked API](https://linkedapi.io) - LinkedIn automation and data extraction in your n8n automations.

## Installation

### n8n Cloud / Self-hosted
1. Go to **Settings** → **Community Nodes**
2. Enter: `n8n-nodes-linked-api`
3. Click **Install**

### Manual
```bash
npm install n8n-nodes-linked-api
```

## Credentials Setup

1. Get your tokens from [Linked API Platform](https://linkedapi.io):
   - **Linked API Token**: Platform access token
   - **Identification Token**: Account-specific token
![Get your tokens](https://linkedapi.io/content/images/2025/08/tokens.webp)


2. In n8n: **Credentials** → **Create New** → **Linked API**

## Available Operations

| Operation | Description | Key Parameters |
|-----------|-------------|----------------|
| **Fetch Person** | Extract LinkedIn profile data | `personUrl`, optional: experience, education, skills, posts |
| **Fetch Company** | Get company information | `companyUrl`, optional: employees, posts |
| **Search Companies** | Search for companies | `keywords`, filters: location, industry, size |

> **📖 Full Documentation**: [linkedapi.io/docs](https://linkedapi.io/docs/)

## Quick Examples

### Basic Profile Fetch
```javascript
// Node parameters
{
  "operation": "fetchPerson",
  "personUrl": "https://linkedin.com/in/john-doe",
  "retrieveExperience": true
}
```

### Company Search
```javascript
// Node parameters  
{
  "operation": "searchCompanies",
  "keywords": "artificial intelligence",
  "location": "San Francisco",
  "limit": 10
}
```

## Development

```bash
git clone https://github.com/Linked-API/n8n-nodes-linked-api.git
npm install
npm run build
```

## License & Support

- **License**: MIT
- **Issues**: [GitHub](https://github.com/Linked-API/n8n-nodes-linked-api/issues)
- **Docs**: [linkedapi.io/docs](https://linkedapi.io/docs/)
- **Email**: support@linkedapi.io
