# Operations Structure

This folder contains separate files for each LinkedAPI operation, following n8n's declarative style.

## File Structure

```
operations/
├── README.md                           # This file
├── index.ts                            # Export all operations
├── FetchPerson.ts                      # Fetch person operation
├── FetchCompany.ts                     # Fetch company operation
├── SearchCompanies.ts                  # Search companies operation
├── SalesNavigatorSearchCompanies.ts    # Sales Navigator search companies
└── [YourNewOperation].ts               # Add new operations here
```

## Adding New Operations

### 1. Create Operation File

Create a new file following this template (e.g. `SendMessage.ts`):

```typescript
import type { INodeProperties } from 'n8n-workflow';

export const sendMessageFields: INodeProperties[] = [
	// Operation-level routing configuration (triggers the request)
	{
		displayName: '',
		name: 'sendMessageOperation',
		type: 'hidden',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['sendMessage'],
			},
		},
		default: '',
		routing: {
			request: {
				body: {
					operationName: 'sendMessage',
					webhookUrl: '={{$parameter["webhookUrl"]}}',
					data: {
						personUrl: '={{$parameter["personUrl"]}}',
						message: '={{$parameter["message"]}}',
						subject: '={{$parameter["additionalFields"]?.subject}}',
					},
				},
			},
		},
	},
	// Parameter fields (no routing, just UI)
	{
		displayName: 'Person URL',
		name: 'personUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['sendMessage'],
			},
		},
		default: '',
		placeholder: 'https://www.linkedin.com/in/john-doe',
		description: 'The LinkedIn profile URL of the person to message',
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['sendMessage'],
			},
		},
		default: '',
		placeholder: 'Hello! I would like to connect...',
		description: 'The message to send',
	},
	// Add Additional Fields collection if needed
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['sendMessage'],
			},
		},
		options: [
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				default: '',
				description: 'Message subject line',
			},
		],
	},
];
```

## Operation Patterns by Parameter Count

### Pattern 1: Single Required Parameter

```typescript
// Example: Fetch Person (1 required: personUrl)
{
	name: 'fetchPersonOperation',
	routing: {
		request: {
			body: {
				operationName: 'fetchPerson',
				webhookUrl: '={{$parameter["webhookUrl"]}}',
				data: {
					personUrl: '={{$parameter["personUrl"]}}',
					// Optional fields...
				},
			},
		},
	},
},
```

### Pattern 2: Multiple Required Parameters

```typescript
// Example: Send Message (2 required: personUrl, message)
{
	name: 'sendMessageOperation',
	routing: {
		request: {
			body: {
				operationName: 'sendMessage',
				webhookUrl: '={{$parameter["webhookUrl"]}}',
				data: {
					personUrl: '={{$parameter["personUrl"]}}',
					message: '={{$parameter["message"]}}',
					// Optional fields...
				},
			},
		},
	},
},
```

### Pattern 3: No Required Parameters

```typescript
// Example: Retrieve SSI (0 required parameters)
{
	name: 'retrieveSSIOperation',
	routing: {
		request: {
			body: {
				operationName: 'retrieveSSI',
				webhookUrl: '={{$parameter["webhookUrl"]}}',
				data: {
					// Only optional fields if any...
				},
			},
		},
	},
},
```

### Pattern 4: Conditional Configuration Objects

When you have configuration objects that should only be included if a feature is enabled, use ternary operators:

```typescript
// Example: Fetch Person with conditional configs
{
	name: 'fetchPersonOperation',
	routing: {
		request: {
			body: {
				operationName: 'fetchPerson',
				webhookUrl: '={{$parameter["webhookUrl"]}}',
				data: {
					personUrl: '={{$parameter["personUrl"]}}',
					retrievePosts: '={{$parameter["retrievePosts"] || false}}',
					retrieveComments: '={{$parameter["retrieveComments"] || false}}',
					// Only include if retrievePosts is true, otherwise undefined
					postsRetrievalConfig: '={{$parameter["retrievePosts"] ? {limit: $parameter["postsLimit"] || 20, since: $parameter["postsSince"] || undefined} : undefined}}',
					// Only include if retrieveComments is true, otherwise undefined
					commentsRetrievalConfig: '={{$parameter["retrieveComments"] ? {limit: $parameter["commentsLimit"] || 20, since: $parameter["commentsSince"] || undefined} : undefined}}',
				},
			},
		},
	},
},
```

**Key Benefits:**

- ✅ `retrievePosts: false` → `postsRetrievalConfig: undefined` (excluded from JSON)
- ✅ `retrievePosts: true` → Includes `postsRetrievalConfig` with limit/since
- ✅ Cleaner API requests without unnecessary empty objects
- ✅ Simple ternary operator syntax (no complex multi-line JavaScript)

### Pattern 5: Complex Filter Objects

For operations like search that need complex filter objects with multiple optional fields:

```typescript
// Example: Search Companies with filter object
{
	name: 'searchCompaniesOperation',
	routing: {
		request: {
			body: {
				operationName: 'searchCompanies',
				webhookUrl: '={{$parameter["webhookUrl"]}}',
				data: {
					term: '={{$parameter["searchTerm"] || ""}}',
					limit: '={{$parameter["limit"] || 10}}',
					filter: {
						locations: '={{$parameter["additionalSearchFields"]?.locations ? $parameter["additionalSearchFields"].locations.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
						industries: '={{$parameter["additionalSearchFields"]?.industries ? $parameter["additionalSearchFields"].industries.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
						sizes: '={{$parameter["additionalSearchFields"]?.sizes || undefined}}',
					},
				},
			},
		},
	},
},
```

**Key Benefits:**

- ✅ Each filter field is conditionally included
- ✅ String parsing (semicolon-separated) handled inline
- ✅ `undefined` values are excluded from the final JSON
- ✅ No complex multi-line JavaScript expressions (avoids parsing errors)

### 2. Add to Index

Add your new operation to `index.ts`:

```typescript
export { sendMessageFields } from './SendMessage';
```

### 3. Add to Available Operations

Add your operation to `descriptions/AvailableOperations.ts`:

```typescript
{
	name: 'Send Message',
	value: 'sendMessage',
	description: 'Send a message to a LinkedIn person',
	action: 'Send a message',
},
```

### 4. Import in Main Node

Add your operation to the imports in `LinkedApi.node.ts`:

```typescript
import {
	fetchPersonFields,
	fetchCompanyFields,
	searchCompaniesFields,
	salesNavigatorSearchCompaniesFields,
	sendMessageFields, // Add this
} from './operations';
```

And add to the properties array:

```typescript
properties: [
	// ... existing properties
	...sendMessageFields, // Add this
],
```

## Operation Naming Conventions

- **File name**: PascalCase (e.g., `SendMessage.ts`, `RetrieveConnections.ts`)
- **Export name**: camelCase + "Fields" (e.g., `sendMessageFields`, `retrieveConnectionsFields`)
- **Operation name**: camelCase (e.g., `sendMessage`, `retrieveConnections`)
- **Parameter names**: camelCase (e.g., `personUrl`, `messageText`)

## Field Types Reference

Common field types you can use:

- `string` - Text input
- `number` - Numeric input
- `boolean` - Checkbox
- `options` - Dropdown with predefined options
- `multiOptions` - Multi-select dropdown
- `collection` - Group of optional fields
- `dateTime` - Date/time picker

## Best Practices

1. **Always use `routing.request.body`** with the declarative structure
2. **Group optional fields** under "Additional Fields" collection
3. **Use clear descriptions** for all fields
4. **Add proper `displayOptions`** to show fields only for relevant operations
5. **Follow the webhook + operationName + data pattern**

## Resources

- [n8n Node Properties Documentation](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/)
- [n8n Declarative Style Guide](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/)
