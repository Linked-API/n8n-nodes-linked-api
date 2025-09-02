import type { INodeProperties } from 'n8n-workflow';

export const searchCompaniesFields: INodeProperties[] = [
	// Operation-level routing configuration (triggers the request)
	{
		displayName: '',
		name: 'searchCompaniesOperation',
		type: 'hidden',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['searchCompanies'],
			},
		},
		default: '',
		routing: {
			request: {
				body: {
					operationName: 'searchCompanies',
					webhookUrl: '={{$parameter["webhookUrl"]}}',
					data: {
						term: '={{$parameter["searchTerm"] || undefined}}',
						limit: '={{$parameter["limit"]}}',
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
	// Parameter fields (no routing, just UI)
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['searchCompanies'],
			},
		},
		default: '',
		placeholder: 'software development',
		description: 'Search term/keywords for company name or description',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 10,
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['searchCompanies'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalSearchFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['searchCompanies'],
			},
		},
		options: [
			{
				displayName: 'Locations',
				name: 'locations',
				type: 'string',
				default: '',
				placeholder: 'San Francisco; New York',
				description: 'Filter by company locations (separate with semicolons)',
			},
			{
				displayName: 'Industries',
				name: 'industries',
				type: 'string',
				default: '',
				placeholder: 'Software Development; Marketing',
				description: 'Filter by company industries (separate with semicolons)',
			},
			{
				displayName: 'Company Sizes',
				name: 'sizes',
				type: 'multiOptions',
				default: [],
				// eslint-disable-next-line n8n-nodes-base/node-param-multi-options-type-unsorted-items
				options: [
					{ name: '1-10', value: '1-10' },
					{ name: '11-50', value: '11-50' },
					{ name: '51-200', value: '51-200' },
					{ name: '201-500', value: '201-500' },
					{ name: '501-1000', value: '501-1000' },
					{ name: '1001-5000', value: '1001-5000' },
					{ name: '5001-10000', value: '5001-10000' },
					{ name: '10001+', value: '10001+' },
				],
				description: 'Filter by company size (employee count)',
			},
		],
	},
];
