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

const show = {
	resource: ['standard'],
	operation: ['fetchCompany'],
};

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
		show,
	),
	createParameterWithDisplayOptions(companyUrlParameter, show),
	// Employees
	{
		displayName: 'Retrieve Employees',
		name: 'retrieveEmployees',
		type: 'boolean',
		default: false,
		description: 'Whether to retrieve company employees',
		displayOptions: {
			show,
		},
	},
	createParameterWithDisplayOptions(employeeLimitParameter, {
		...show,
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
			show,
		},
	},
	createParameterWithDisplayOptions(dmsLimitParameter, {
		...show,
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
			show,
		},
	},
	createParameterWithDisplayOptions(postsLimitParameter, {
		...show,
		retrievePosts: [true],
	}),
	createParameterWithDisplayOptions(postsSinceParameter, {
		...show,
		retrievePosts: [true],
	}),
];
