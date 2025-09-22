import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	searchTermParameter,
	limitParameter,
	locationsParameter,
	industriesParameter,
	companySizesParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class SearchCompanies extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.searchCompanies;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(searchTermParameter, this.show),
		createParameterWithDisplayOptions(limitParameter, this.show),
		createParameterWithDisplayOptions(locationsParameter, this.show),
		createParameterWithDisplayOptions(industriesParameter, this.show),
		createParameterWithDisplayOptions(companySizesParameter, this.show),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const filter: Record<string, any> = {};
		
		const locations = this.stringParameter(context, 'locations');
		const industries = this.stringParameter(context, 'industries');
		const sizes = context.getNodeParameter('sizes', 0, []) as string[];

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

		return {
			term: this.stringParameter(context, 'searchTerm') || undefined,
			limit: this.numberParameter(context, 'limit'),
			filter,
		};
	}
}
