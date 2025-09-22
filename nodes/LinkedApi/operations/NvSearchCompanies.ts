/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-multi-options-type-unsorted-items */
import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	searchTermParameter,
	limitParameter,
	locationsParameter,
	industriesParameter,
	companySizesParameter,
	annualRevenueMinParameter,
	annualRevenueMaxParameter,
} from '../shared/SharedParameters';
import { SalesNavigatorLinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';

export class NvSearchCompanies extends SalesNavigatorLinkedApiOperation {
	operationName = AVAILABLE_ACTION.nvSearchCompanies;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(searchTermParameter, this.show),
		createParameterWithDisplayOptions(limitParameter, this.show),
		createParameterWithDisplayOptions(locationsParameter, this.show),
		createParameterWithDisplayOptions(industriesParameter, this.show),
		createParameterWithDisplayOptions(companySizesParameter, this.show),
		createParameterWithDisplayOptions(annualRevenueMinParameter, this.show),
		createParameterWithDisplayOptions(annualRevenueMaxParameter, this.show),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const filter: Record<string, any> = {};
		
		const locations = this.stringParameter(context, 'locations');
		const industries = this.stringParameter(context, 'industries');
		const sizes = context.getNodeParameter('sizes', 0, []) as string[];
		const annualRevenueMin = context.getNodeParameter('annualRevenueMin', 0, '') as string;
		const annualRevenueMax = context.getNodeParameter('annualRevenueMax', 0, '') as string;

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
			filter,
		};
	}
}
