/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-multi-options-type-unsorted-items */
import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	searchTermParameter,
	limitParameter,
} from '../shared/SharedParameters';
import { SalesNavigatorLinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';

export class NvSearchCompanies extends SalesNavigatorLinkedApiOperation {
	operationName = AVAILABLE_ACTION.nvSearchCompanies;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(searchTermParameter, this.show),
		createParameterWithDisplayOptions(limitParameter, this.show),
		{
			displayName: 'Additional Fields',
			name: 'additionalSalesNavFields',
			type: 'collection',
			default: {},
			placeholder: 'Add Field',
			displayOptions: {
				show: this.show,
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

	public body(context: IExecuteFunctions): Record<string, any> {
		const additionalFields = context.getNodeParameter('additionalSalesNavFields', 0, {}) as {
			locations?: string;
			industries?: string;
			sizes?: string[];
			annualRevenueMin?: string;
			annualRevenueMax?: string;
		};

		const filter: Record<string, any> = {};
		if (additionalFields.locations) {
			filter.locations = additionalFields.locations
				.split(';')
				.map((s) => s.trim())
				.filter((s) => s);
		}
		if (additionalFields.industries) {
			filter.industries = additionalFields.industries
				.split(';')
				.map((s) => s.trim())
				.filter((s) => s);
		}
		if (additionalFields.sizes) {
			filter.sizes = additionalFields.sizes;
		}
		if (additionalFields.annualRevenueMin && additionalFields.annualRevenueMax) {
			filter.annualRevenue = {
				min: additionalFields.annualRevenueMin,
				max: additionalFields.annualRevenueMax,
			};
		}

		return {
			term: this.stringParameter(context, 'searchTerm') || undefined,
			limit: this.numberParameter(context, 'limit'),
			filter,
		};
	}
}
