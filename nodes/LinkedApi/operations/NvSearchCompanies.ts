/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-multi-options-type-unsorted-items */
import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	searchTermParameter,
	limitParameter,
} from '../shared/SharedParameters';

export const nvSearchCompaniesFields: INodeProperties[] = [
	createRequestOperation(
		'nvSearchCompanies',
		{
			term: '={{$parameter["searchTerm"]}}',
			limit: '={{$parameter["limit"]}}',
			filter: {
				locations:
					'={{$parameter["additionalSalesNavFields"]?.locations ? $parameter["additionalSalesNavFields"].locations.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
				industries:
					'={{$parameter["additionalSalesNavFields"]?.industries ? $parameter["additionalSalesNavFields"].industries.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
				sizes: '={{$parameter["additionalSalesNavFields"]?.sizes || undefined}}',
				annualRevenue:
					'={{$parameter["additionalSalesNavFields"]?.annualRevenueMin && $parameter["additionalSalesNavFields"]?.annualRevenueMax ? {min: $parameter["additionalSalesNavFields"].annualRevenueMin, max: $parameter["additionalSalesNavFields"].annualRevenueMax} : undefined}}',
			},
		},
		{
			resource: ['salesNavigator'],
			operation: ['nvSearchCompanies'],
		},
	),
	// Parameter fields (no routing, just UI)
	createParameterWithDisplayOptions(searchTermParameter, {
		resource: ['salesNavigator'],
		operation: ['nvSearchCompanies'],
	}),
	createParameterWithDisplayOptions(limitParameter, {
		resource: ['salesNavigator'],
		operation: ['nvSearchCompanies'],
	}),
	{
		displayName: 'Additional Fields',
		name: 'additionalSalesNavFields',
		type: 'collection',
		default: {},
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['salesNavigator'],
				operation: ['nvSearchCompanies'],
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
			{
				displayName: 'Annual Revenue Min',
				name: 'annualRevenueMin',
				type: 'options',
				default: '',
				options: [
					{ name: 'Not Set', value: '' },
					{ name: '0', value: '0' },
					{ name: '0.5', value: '0.5' },
					{ name: '1', value: '1' },
					{ name: '2.5', value: '2.5' },
					{ name: '5', value: '5' },
					{ name: '10', value: '10' },
					{ name: '20', value: '20' },
					{ name: '50', value: '50' },
					{ name: '100', value: '100' },
					{ name: '500', value: '500' },
					{ name: '1000', value: '1000' },
				],
				description: 'Minimum annual revenue in million USD',
			},
			{
				displayName: 'Annual Revenue Max',
				name: 'annualRevenueMax',
				type: 'options',
				default: '',
				options: [
					{ name: 'Not Set', value: '' },
					{ name: '0.5', value: '0.5' },
					{ name: '1', value: '1' },
					{ name: '2.5', value: '2.5' },
					{ name: '5', value: '5' },
					{ name: '10', value: '10' },
					{ name: '20', value: '20' },
					{ name: '50', value: '50' },
					{ name: '100', value: '100' },
					{ name: '500', value: '500' },
					{ name: '1000', value: '1000' },
					{ name: '1000+', value: '1000+' },
				],
				description: 'Maximum annual revenue in million USD',
			},
		],
	},
];
