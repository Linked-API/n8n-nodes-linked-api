/* eslint-disable n8n-nodes-base/node-param-multi-options-type-unsorted-items */
import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	limitParameter,
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

export class RetrieveConnections extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.retrieveConnections;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(limitParameter, this.show),
		// Connection filter fields
		createParameterWithDisplayOptions(firstNameParameter, this.show),
		createParameterWithDisplayOptions(lastNameParameter, this.show),
		createParameterWithDisplayOptions(positionParameter, this.show),
		createParameterWithDisplayOptions(locationsParameter, this.show),
		createParameterWithDisplayOptions(industriesParameter, this.show),
		createParameterWithDisplayOptions(currentCompaniesParameter, this.show),
		createParameterWithDisplayOptions(previousCompaniesParameter, this.show),
		createParameterWithDisplayOptions(schoolsParameter, this.show),
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
			limit: this.numberParameter(context, 'limit'),
			filter,
		};
	}
}
