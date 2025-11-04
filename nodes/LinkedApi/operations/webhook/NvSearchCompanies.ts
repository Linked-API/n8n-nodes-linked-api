/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-multi-options-type-unsorted-items */
import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	searchTermParameter,
	limitParameter,
	customSearchUrlParameter,
	locationsParameter,
	industriesParameter,
	companySizesParameter,
	annualRevenueMinParameter,
	annualRevenueMaxParameter,
} from '../../shared/SharedParameters';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class NvSearchCompanies extends SalesNavigatorLinkedApiOperation {
	operationName = AVAILABLE_ACTION.nvSearchCompanies;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(searchTermParameter, this.show),
		createParameterWithDisplayOptions(limitParameter, this.show),
		{
			displayName: 'Advanced Filter',
			name: 'advancedFilter',
			type: 'collection',
			placeholder: 'Add Field',
			default: {},
			displayOptions: {
				show: this.show,
			},
			options: [
				{
					...customSearchUrlParameter,
					placeholder: 'https://www.linkedin.com/sales/search/companies?...',
				},
				locationsParameter,
				industriesParameter,
				companySizesParameter,
				annualRevenueMinParameter,
				annualRevenueMaxParameter,
			],
		},
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const filter: Record<string, any> = {};
		const advancedFilter = context.getNodeParameter('advancedFilter', 0, {}) as {
			customSearchUrl?: string;
			locations?: string;
			industries?: string;
			sizes?: string[];
			annualRevenueMin?: string;
			annualRevenueMax?: string;
		};

		const { locations, industries, sizes, annualRevenueMin, annualRevenueMax } = advancedFilter;

		if (locations) {
			filter.locations = locations
				.split(';')
				.map((s) => s.trim())
				.filter((s) => s);
		}
		if (industries) {
			filter.industries = industries
				.split(';')
				.map((s) => s.trim())
				.filter((s) => s);
		}
		if (sizes && sizes.length > 0) {
			filter.sizes = sizes;
		}
		if (annualRevenueMin && annualRevenueMax) {
			filter.annualRevenue = {
				min: annualRevenueMin,
				max: annualRevenueMax,
			};
		}

		return {
			term: this.stringParameter(context, 'searchTerm') || undefined,
			limit: this.numberParameter(context, 'limit'),
			customSearchUrl: advancedFilter.customSearchUrl || undefined,
			filter,
		};
	}
}
