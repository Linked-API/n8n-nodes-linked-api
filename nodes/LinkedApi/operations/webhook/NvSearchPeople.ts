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
		createParameterWithDisplayOptions({ ...customSearchUrlParameter, placeholder: 'https://www.linkedin.com/sales/search/people?...' }, this.show),

		// Search filter fields
		createParameterWithDisplayOptions(firstNameParameter, this.show),
		createParameterWithDisplayOptions(lastNameParameter, this.show),
		createParameterWithDisplayOptions(positionParameter, this.show),
		createParameterWithDisplayOptions(locationsParameter, this.show),
		createParameterWithDisplayOptions(industriesParameter, this.show),
		createParameterWithDisplayOptions(currentCompaniesParameter, this.show),
		createParameterWithDisplayOptions(previousCompaniesParameter, this.show),
		createParameterWithDisplayOptions(schoolsParameter, this.show),
		createParameterWithDisplayOptions(yearsOfExperienceParameter, this.show),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const filter: Record<string, any> = {};

		const firstName = this.stringParameter(context, 'firstName');
		const lastName = this.stringParameter(context, 'lastName');
		const position = this.stringParameter(context, 'position');
		const locations = this.stringParameter(context, 'locations');
		const industries = this.stringParameter(context, 'industries');
		const currentCompanies = this.stringParameter(context, 'currentCompanies');
		const previousCompanies = this.stringParameter(context, 'previousCompanies');
		const schools = this.stringParameter(context, 'schools');
		const yearsOfExperiences = context.getNodeParameter('yearsOfExperiences', 0, []) as string[];

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
			customSearchUrl: this.stringParameter(context, 'customSearchUrl') || undefined,
			filter,
		};
	}
}
