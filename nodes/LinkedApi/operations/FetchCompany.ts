import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	companyUrlParameter,
	employeeLimitParameter,
	dmsLimitParameter,
	postsLimitParameter,
	postsSinceParameter,
} from '../shared/SharedParameters';

export const fetchCompanyFields: INodeProperties[] = [
	createRequestOperation(
		'fetchCompany',
		{
			companyUrl: '={{$parameter["companyUrl"]}}',
			retrieveEmployees: '={{$parameter["retrieveEmployees"] || false}}',
			retrieveDMs: '={{$parameter["retrieveDMs"] || false}}',
			retrievePosts: '={{$parameter["retrievePosts"] || false}}',
			employeesRetrievalConfig:
				'={{$parameter["retrieveEmployees"] ? {limit: $parameter["employeeLimit"]} : undefined}}',
			dmsRetrievalConfig:
				'={{$parameter["retrieveDMs"] ? {limit: $parameter["dmsLimit"]} : undefined}}',
			postsRetrievalConfig:
				'={{$parameter["retrievePosts"] ? {limit: $parameter["postsLimit"], since: $parameter["postsSince"] || undefined} : undefined}}',
		},
		{
			resource: ['standard'],
			operation: ['fetchCompany'],
		},
	),
	createParameterWithDisplayOptions(companyUrlParameter, {
		resource: ['standard'],
		operation: ['fetchCompany'],
	}),
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
	createParameterWithDisplayOptions(employeeLimitParameter, {
		resource: ['standard'],
		operation: ['fetchCompany'],
		retrieveEmployees: [true],
	}),
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
	createParameterWithDisplayOptions(dmsLimitParameter, {
		resource: ['standard'],
		operation: ['fetchCompany'],
		retrieveDMs: [true],
	}),
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
	createParameterWithDisplayOptions(postsLimitParameter, {
		resource: ['standard'],
		operation: ['fetchCompany'],
		retrievePosts: [true],
	}),
	createParameterWithDisplayOptions(postsSinceParameter, {
		resource: ['standard'],
		operation: ['fetchCompany'],
		retrievePosts: [true],
	}),
];
