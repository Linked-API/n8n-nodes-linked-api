import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	searchTermParameter,
	limitParameter,
} from '../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';

export class SearchCompanies extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.searchCompanies;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(searchTermParameter, this.show),
		createParameterWithDisplayOptions(limitParameter, this.show),
		{
			displayName: 'Additional Fields',
			name: 'additionalSearchFields',
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

	public body(context: IExecuteFunctions): Record<string, any> {
		const additionalFields = context.getNodeParameter('additionalSearchFields', 0, {}) as {
			locations?: string;
			industries?: string;
			sizes?: string[];
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

		return {
			term: this.stringParameter(context, 'searchTerm') || undefined,
			limit: this.numberParameter(context, 'limit'),
			filter,
		};
	}
}
