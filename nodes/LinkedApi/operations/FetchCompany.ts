import type { INodeProperties } from 'n8n-workflow';

export const fetchCompanyFields: INodeProperties[] = [
	// Operation-level routing configuration (triggers the request)
	{
		displayName: '',
		name: 'fetchCompanyOperation',
		type: 'hidden',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchCompany'],
			},
		},
		default: '',
		routing: {
			request: {
				body: {
					operationName: 'fetchCompany',
					webhookUrl: '={{$parameter["webhookUrl"]}}',
					data: {
						companyUrl: '={{$parameter["companyUrl"]}}',
						retrieveEmployees: '={{$parameter["retrieveEmployees"] || false}}',
						retrieveDMs: '={{$parameter["retrieveDMs"] || false}}',
						retrievePosts: '={{$parameter["retrievePosts"] || false}}',
						employeesRetrievalConfig: '={{$parameter["retrieveEmployees"] ? {limit: $parameter["employeeLimit"]} : undefined}}',
						dmsRetrievalConfig: '={{$parameter["retrieveDMs"] ? {limit: $parameter["dmsLimit"]} : undefined}}',
						postsRetrievalConfig: '={{$parameter["retrievePosts"] ? {limit: $parameter["postsLimit"], since: $parameter["postsSince"] || undefined} : undefined}}',
					},
				},
			},
		},
	},
	// Parameter fields (no routing, just UI)
	{
		displayName: 'Company URL',
		name: 'companyUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchCompany'],
			},
		},
		default: '',
		placeholder: 'https://www.linkedin.com/company/microsoft',
		description: 'The LinkedIn company page URL to fetch',
	},
	// Employees
	{
		displayName: 'Retrieve Employees',
		name: 'retrieveEmployees',
		type: 'boolean',
		default: false,
		description: 'Whether to retrieve company employees',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchCompany'],
			},
		},
	},	
	{
		displayName: 'Employees Limit',
		name: 'employeeLimit',
		type: 'number',
		default: 500,
		description: 'The number of employees to retrieve',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchCompany'],
				retrieveEmployees: [true],
			},
		},
	},
	// Decision Makers
	{
		displayName: 'Retrieve Decision Makers',
		name: 'retrieveDMs',
		type: 'boolean',
		default: false,
		description: 'Whether to retrieve company decision makers',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchCompany'],
			},
		},
	},
	{
		displayName: 'Decision Makers Limit',
		name: 'dmsLimit',
		type: 'number',
		default: 20,
		description: 'The number of decision makers to retrieve',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchCompany'],
				retrieveDMs: [true],
			},
		},
	},
	// Posts
	{
		displayName: 'Retrieve Posts',
		name: 'retrievePosts',
		type: 'boolean',
		default: false,
		description: 'Whether to retrieve company posts',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchCompany'],
			},
		},
	},
	{
		displayName: 'Posts Limit',
		name: 'postsLimit',
		type: 'number',
		default: 20,
		description: 'The number of posts to retrieve',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchCompany'],
				retrievePosts: [true],
			},
		},
	},
	{
		displayName: 'Posts Since',
		name: 'postsSince',
		type: 'dateTime',
		default: '',
		description: 'The date since the posts were created',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchCompany'],
				retrievePosts: [true],
			},
		},
	},
];