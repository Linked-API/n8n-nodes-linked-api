/* eslint-disable n8n-nodes-base/node-param-display-name-miscased */
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
	yearsOfExperienceParameter,
} from '../../shared/SharedParameters';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class NvSearchPeople extends SalesNavigatorLinkedApiOperation {
	operationName = AVAILABLE_ACTION.nvSearchPeople;

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
					placeholder: 'https://www.linkedin.com/sales/search/people?...',
				},
				firstNameParameter,
				lastNameParameter,
				positionParameter,
				locationsParameter,
				industriesParameter,
				currentCompaniesParameter,
				previousCompaniesParameter,
				schoolsParameter,
				yearsOfExperienceParameter,
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
			yearsOfExperiences?: string[];
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
			yearsOfExperiences,
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
		if (yearsOfExperiences && yearsOfExperiences.length > 0) {
			filter.yearsOfExperiences = yearsOfExperiences;
		}

		return {
			term: this.stringParameter(context, 'searchTerm') || undefined,
			limit: this.numberParameter(context, 'limit'),
			customSearchUrl: advancedFilter.customSearchUrl || undefined,
			filter,
		};
	}
}
