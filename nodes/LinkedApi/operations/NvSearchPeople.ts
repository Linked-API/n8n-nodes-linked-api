/* eslint-disable n8n-nodes-base/node-param-display-name-miscased */
/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-multi-options-type-unsorted-items */
import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	searchTermParameter,
	limitParameter,
} from '../shared/SharedParameters';

export const nvSearchPeopleFields: INodeProperties[] = [
	createRequestOperation(
		'nvSearchPeople',
		{
			term: '={{$parameter["searchTerm"] || undefined}}',
			limit: '={{$parameter["limit"]}}',
			filter: {
				firstName: '={{$parameter["additionalSalesNavFields"]?.firstName || undefined}}',
				lastName: '={{$parameter["additionalSalesNavFields"]?.lastName || undefined}}',
				position: '={{$parameter["additionalSalesNavFields"]?.position || undefined}}',
				locations:
					'={{$parameter["additionalSalesNavFields"]?.locations ? $parameter["additionalSalesNavFields"].locations.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
				industries:
					'={{$parameter["additionalSalesNavFields"]?.industries ? $parameter["additionalSalesNavFields"].industries.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
				currentCompanies:
					'={{$parameter["additionalSalesNavFields"]?.currentCompanies ? $parameter["additionalSalesNavFields"].currentCompanies.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
				previousCompanies:
					'={{$parameter["additionalSalesNavFields"]?.previousCompanies ? $parameter["additionalSalesNavFields"].previousCompanies.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
				schools:
					'={{$parameter["additionalSalesNavFields"]?.schools ? $parameter["additionalSalesNavFields"].schools.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
				yearsOfExperiences:
					'={{$parameter["additionalSalesNavFields"]?.yearsOfExperiences || undefined}}',
			},
		},
		{
			resource: ['salesNavigator'],
			operation: ['nvSearchPeople'],
		},
	),
	// Parameter fields (no routing, just UI)
	createParameterWithDisplayOptions(searchTermParameter, {
		resource: ['salesNavigator'],
		operation: ['nvSearchPeople'],
	}),
	createParameterWithDisplayOptions(limitParameter, {
		resource: ['salesNavigator'],
		operation: ['nvSearchPeople'],
	}),
	// Additional Sales Navigator search fields
	{
		displayName: 'Additional Search Fields',
		name: 'additionalSalesNavFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['salesNavigator'],
				operation: ['nvSearchPeople'],
			},
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
			{
				displayName: 'Years of Experience',
				name: 'yearsOfExperiences',
				type: 'multiOptions',
				default: [],
				description: 'Professional experience ranges',
				options: [
					{
						name: 'Less than 1 year',
						value: 'lessThanOne',
					},
					{
						name: '1 to 2 years',
						value: 'oneToTwo',
					},
					{
						name: '3 to 5 years',
						value: 'threeToFive',
					},
					{
						name: '6 to 10 years',
						value: 'sixToTen',
					},
					{
						name: 'More than 10 years',
						value: 'moreThanTen',
					},
				],
			},
		],
	},
];
