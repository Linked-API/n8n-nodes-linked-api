import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	searchTermParameter,
	limitParameter,
	customSearchUrlParameter,
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
		{
			displayName: 'Advanced Filter',
			name: 'additionalFields',
			type: 'collection',
			placeholder: 'Add Field',
			default: {},
			displayOptions: {
				show: this.show,
			},
			options: [
				{
					...customSearchUrlParameter,
					placeholder: 'https://www.linkedin.com/search/results/companies?...',
				},
				locationsParameter,
				industriesParameter,
				companySizesParameter,
			],
		},
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const filter: Record<string, any> = {};
		const additionalFields = context.getNodeParameter('additionalFields', 0, {}) as {
			customSearchUrl?: string;
			locations?: string;
			industries?: string;
			sizes?: string[];
		};

		const locations = additionalFields.locations;
		const industries = additionalFields.industries;
		const sizes = additionalFields.sizes;

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
			customSearchUrl: additionalFields.customSearchUrl || undefined,
			filter,
		};
	}
}
