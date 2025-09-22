/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-multi-options-type-unsorted-items */
import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	searchTermParameter,
	limitParameter,
} from '../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';

export class SearchPeople extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.searchPeople;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(searchTermParameter, this.show),
		createParameterWithDisplayOptions(limitParameter, this.show),
		// Additional search fields
		{
			displayName: 'Additional Search Fields',
			name: 'additionalSearchFields',
			type: 'collection',
			placeholder: 'Add Field',
			default: {},
			displayOptions: {
				show: this.show,
			},
			options: [
				{
					displayName: 'First Name',
					name: 'firstName',
					type: 'string',
					default: '',
					description: 'First name of person',
				},
				{
					displayName: 'Last Name',
					name: 'lastName',
					type: 'string',
					default: '',
					description: 'Last name of person',
				},
				{
					displayName: 'Position',
					name: 'position',
					type: 'string',
					default: '',
					description: 'Job position of person',
				},
				{
					displayName: 'Locations',
					name: 'locations',
					type: 'string',
					default: '',
					description:
						'Locations separated by semicolons (e.g., "New York; San Francisco; London")',
				},
				{
					displayName: 'Industries',
					name: 'industries',
					type: 'string',
					default: '',
					description:
						'Industries separated by semicolons (e.g., "Software Development; Technology")',
				},
				{
					displayName: 'Current Companies',
					name: 'currentCompanies',
					type: 'string',
					default: '',
					description: 'Current companies separated by semicolons (e.g., "Google; Microsoft")',
				},
				{
					displayName: 'Previous Companies',
					name: 'previousCompanies',
					type: 'string',
					default: '',
					description: 'Previous companies separated by semicolons (e.g., "Apple; Facebook")',
				},
				{
					displayName: 'Schools',
					name: 'schools',
					type: 'string',
					default: '',
					description: 'Schools separated by semicolons (e.g., "Stanford University; MIT")',
				},
			],
		},
	];
	public body(context: IExecuteFunctions): Record<string, any> {
		const additionalFields = context.getNodeParameter('additionalSearchFields', 0, {}) as {
			firstName?: string;
			lastName?: string;
			position?: string;
			locations?: string;
			industries?: string;
			currentCompanies?: string;
			previousCompanies?: string;
			schools?: string;
		};

		const filter: Record<string, any> = {};
		if (additionalFields.firstName) filter.firstName = additionalFields.firstName;
		if (additionalFields.lastName) filter.lastName = additionalFields.lastName;
		if (additionalFields.position) filter.position = additionalFields.position;
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
		if (additionalFields.currentCompanies) {
			filter.currentCompanies = additionalFields.currentCompanies
				.split(';')
				.map((s) => s.trim())
				.filter((s) => s);
		}
		if (additionalFields.previousCompanies) {
			filter.previousCompanies = additionalFields.previousCompanies
				.split(';')
				.map((s) => s.trim())
				.filter((s) => s);
		}
		if (additionalFields.schools) {
			filter.schools = additionalFields.schools
				.split(';')
				.map((s) => s.trim())
				.filter((s) => s);
		}

		return {
			term: this.stringParameter(context, 'searchTerm') || undefined,
			limit: this.numberParameter(context, 'limit'),
			filter,
		};
	}
}
