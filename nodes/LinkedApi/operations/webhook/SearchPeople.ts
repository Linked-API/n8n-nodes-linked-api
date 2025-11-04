/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-multi-options-type-unsorted-items */
import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	searchTermParameter,
	limitParameter,
	customSearchUrlParameter,
	firstNameParameter,
	lastNameParameter,
	positionParameter,
	locationsParameter,
	industriesParameter,
	currentCompaniesParameter,
	previousCompaniesParameter,
	schoolsParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class SearchPeople extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.searchPeople;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(
			{ ...searchTermParameter, placeholder: 'John Doe' },
			this.show,
		),
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
					placeholder: 'https://www.linkedin.com/search/results/people?...',
				},
				firstNameParameter,
				lastNameParameter,
				positionParameter,
				locationsParameter,
				industriesParameter,
				currentCompaniesParameter,
				previousCompaniesParameter,
				schoolsParameter,
			],
		},
	];
	public body(context: IExecuteFunctions): Record<string, any> {
		const filter: Record<string, any> = {};
		const advancedFilter = context.getNodeParameter('advancedFilter', 0, {}) as {
			customSearchUrl?: string;
			firstName?: string;
			lastName?: string;
			position?: string;
			locations?: string;
			industries?: string;
			currentCompanies?: string;
			previousCompanies?: string;
			schools?: string;
		};

		const {
			firstName,
			lastName,
			position,
			locations,
			industries,
			currentCompanies,
			previousCompanies,
			schools,
		} = advancedFilter;

		if (firstName) filter.firstName = firstName;
		if (lastName) filter.lastName = lastName;
		if (position) filter.position = position;
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
		if (currentCompanies) {
			filter.currentCompanies = currentCompanies
				.split(';')
				.map((s) => s.trim())
				.filter((s) => s);
		}
		if (previousCompanies) {
			filter.previousCompanies = previousCompanies
				.split(';')
				.map((s) => s.trim())
				.filter((s) => s);
		}
		if (schools) {
			filter.schools = schools
				.split(';')
				.map((s) => s.trim())
				.filter((s) => s);
		}

		return {
			term: this.stringParameter(context, 'searchTerm') || undefined,
			limit: this.numberParameter(context, 'limit'),
			customSearchUrl: advancedFilter.customSearchUrl || undefined,
			filter,
		};
	}
}
