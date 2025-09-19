/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-multi-options-type-unsorted-items */
import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	searchTermParameter,
	limitParameter,
} from '../shared/SharedParameters';

const show = {
	resource: ['standard'],
	operation: ['searchPeople'],
};

export const searchPeopleFields: INodeProperties[] = [
	createRequestOperation(
		'searchPeople',
		{
			term: '={{$parameter["searchTerm"] || undefined}}',
			limit: '={{$parameter["limit"]}}',
			filter: {
				firstName: '={{$parameter["additionalSearchFields"]?.firstName || undefined}}',
				lastName: '={{$parameter["additionalSearchFields"]?.lastName || undefined}}',
				position: '={{$parameter["additionalSearchFields"]?.position || undefined}}',
				locations:
					'={{$parameter["additionalSearchFields"]?.locations ? $parameter["additionalSearchFields"].locations.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
				industries:
					'={{$parameter["additionalSearchFields"]?.industries ? $parameter["additionalSearchFields"].industries.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
				currentCompanies:
					'={{$parameter["additionalSearchFields"]?.currentCompanies ? $parameter["additionalSearchFields"].currentCompanies.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
				previousCompanies:
					'={{$parameter["additionalSearchFields"]?.previousCompanies ? $parameter["additionalSearchFields"].previousCompanies.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
				schools:
					'={{$parameter["additionalSearchFields"]?.schools ? $parameter["additionalSearchFields"].schools.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
			},
		},
		show,
	),
	// Parameter fields (no routing, just UI)
	createParameterWithDisplayOptions(searchTermParameter, show),
	createParameterWithDisplayOptions(limitParameter, show),
	// Additional search fields
	{
		displayName: 'Additional Search Fields',
		name: 'additionalSearchFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show,
		},
		options: [
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'First name of person',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'Last name of person',
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'string',
				default: '',
				description: 'Job position of person',
			},
			{
				displayName: 'Locations',
				name: 'locations',
				type: 'string',
				default: '',
				description: 'Locations separated by semicolons (e.g., "New York; San Francisco; London")',
			},
			{
				displayName: 'Industries',
				name: 'industries',
				type: 'string',
				default: '',
				description:
					'Industries separated by semicolons (e.g., "Software Development; Technology")',
			},
			{
				displayName: 'Current Companies',
				name: 'currentCompanies',
				type: 'string',
				default: '',
				description: 'Current companies separated by semicolons (e.g., "Google; Microsoft")',
			},
			{
				displayName: 'Previous Companies',
				name: 'previousCompanies',
				type: 'string',
				default: '',
				description: 'Previous companies separated by semicolons (e.g., "Apple; Facebook")',
			},
			{
				displayName: 'Schools',
				name: 'schools',
				type: 'string',
				default: '',
				description: 'Schools separated by semicolons (e.g., "Stanford University; MIT")',
			},
		],
	},
];
