/* eslint-disable n8n-nodes-base/node-param-multi-options-type-unsorted-items */
import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	limitParameter,
} from '../shared/SharedParameters';

const show = {
	resource: ['standard'],
	operation: ['retrieveConnections'],
};

export const retrieveConnectionsFields: INodeProperties[] = [
	createRequestOperation(
		'retrieveConnections',
		{
			limit: '={{$parameter["limit"]}}',
			filter: {
				firstName: '={{$parameter["additionalConnectionFields"]?.firstName || undefined}}',
				lastName: '={{$parameter["additionalConnectionFields"]?.lastName || undefined}}',
				position: '={{$parameter["additionalConnectionFields"]?.position || undefined}}',
				locations:
					'={{$parameter["additionalConnectionFields"]?.locations ? $parameter["additionalConnectionFields"].locations.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
				industries:
					'={{$parameter["additionalConnectionFields"]?.industries ? $parameter["additionalConnectionFields"].industries.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
				currentCompanies:
					'={{$parameter["additionalConnectionFields"]?.currentCompanies ? $parameter["additionalConnectionFields"].currentCompanies.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
				previousCompanies:
					'={{$parameter["additionalConnectionFields"]?.previousCompanies ? $parameter["additionalConnectionFields"].previousCompanies.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
				schools:
					'={{$parameter["additionalConnectionFields"]?.schools ? $parameter["additionalConnectionFields"].schools.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
			},
		},
		show,
	),
	// Parameter fields (no routing, just UI)
	createParameterWithDisplayOptions(limitParameter, show),
	// Additional connection filter fields
	{
		displayName: 'Additional Filter Fields',
		name: 'additionalConnectionFields',
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
