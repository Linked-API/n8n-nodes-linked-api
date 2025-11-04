/* eslint-disable n8n-nodes-base/node-param-multi-options-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-display-name-miscased */
import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	companyHashedUrlParameter,
	employeeLimitParameter,
	dmsLimitParameter,
} from '../../shared/SharedParameters';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class NvFetchCompany extends SalesNavigatorLinkedApiOperation {
	operationName = AVAILABLE_ACTION.nvFetchCompany;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(companyHashedUrlParameter, this.show),
		// Employees
		{
			displayName: 'Retrieve Employees',
			name: 'retrieveEmployees',
			type: 'boolean',
			default: false,
			description: 'Whether to retrieve company employees',
			displayOptions: {
				show: this.show,
			},
		},
		createParameterWithDisplayOptions(employeeLimitParameter, {
			...this.show,
			retrieveEmployees: [true],
		}),
		{
			displayName: 'Additional Employee Fields',
			name: 'additionalEmployeeFields',
			type: 'collection',
			default: {},
			placeholder: 'Add Field',
			displayOptions: {
				show: {
					...this.show,
					retrieveEmployees: [true],
				},
			},
			options: [
				{
					displayName: 'First Name',
					name: 'firstName',
					type: 'string',
					default: '',
					description: 'First name of employee',
				},
				{
					displayName: 'Last Name',
					name: 'lastName',
					type: 'string',
					default: '',
					description: 'Last name of employee',
				},
				{
					displayName: 'Positions',
					name: 'positions',
					type: 'string',
					default: '',
					placeholder: 'engineer; manager',
					description: 'Job position names (separate with semicolons)',
				},
				{
					displayName: 'Locations',
					name: 'locations',
					type: 'string',
					default: '',
					placeholder: 'United States; Canada',
					description: 'Employee locations (separate with semicolons)',
				},
				{
					displayName: 'Industries',
					name: 'industries',
					type: 'string',
					default: '',
					placeholder: 'Software Development; Marketing',
					description: 'Employee industries (separate with semicolons)',
				},
				{
					displayName: 'Schools',
					name: 'schools',
					type: 'string',
					default: '',
					placeholder: 'Stanford University; MIT',
					description: 'Schools attended (separate with semicolons)',
				},
				{
					displayName: 'Years of Experience',
					name: 'yearsOfExperiences',
					type: 'multiOptions',
					default: [],
					options: [
						{ name: 'Less than 1 year', value: 'lessThanOne' },
						{ name: '1 to 2 years', value: 'oneToTwo' },
						{ name: '3 to 5 years', value: 'threeToFive' },
						{ name: '6 to 10 years', value: 'sixToTen' },
						{ name: 'More than 10 years', value: 'moreThanTen' },
					],
					description: 'Years of professional experience ranges',
				},
			],
		},
		// Decision Makers
		{
			displayName: 'Retrieve Decision Makers',
			name: 'retrieveDMs',
			type: 'boolean',
			default: false,
			description: 'Whether to retrieve company decision makers',
			displayOptions: {
				show: this.show,
			},
		},
		createParameterWithDisplayOptions(dmsLimitParameter, {
			...this.show,
			retrieveDMs: [true],
		}),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const retrieveEmployees = this.booleanParameter(context, 'retrieveEmployees');
		const retrieveDMs = this.booleanParameter(context, 'retrieveDMs');

		const body = {
			companyHashedUrl: this.stringParameter(context, 'companyHashedUrl'),
			retrieveEmployees,
			retrieveDMs,
		};

		if (retrieveEmployees) {
			const additionalFields = context.getNodeParameter('additionalEmployeeFields', 0, {}) as {
				firstName?: string;
				lastName?: string;
				positions?: string;
				locations?: string;
				industries?: string;
				schools?: string;
				yearsOfExperiences?: string[];
			};

			const filter: Record<string, any> = {};
			if (additionalFields.firstName) filter.firstName = additionalFields.firstName;
			if (additionalFields.lastName) filter.lastName = additionalFields.lastName;
			if (additionalFields.positions) {
				filter.positions = additionalFields.positions
					.split(';')
					.map((s) => s.trim())
					.filter((s) => s);
			}
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
			if (additionalFields.schools) {
				filter.schools = additionalFields.schools
					.split(';')
					.map((s) => s.trim())
					.filter((s) => s);
			}
			if (additionalFields.yearsOfExperiences) {
				filter.yearsOfExperiences = additionalFields.yearsOfExperiences;
			}

			Object.assign(body, {
				employeesRetrievalConfig: {
					limit: this.numberParameter(context, 'employeeLimit'),
					filter,
				},
			});
		}

		if (retrieveDMs) {
			Object.assign(body, {
				dmsRetrievalConfig: {
					limit: this.numberParameter(context, 'dmsLimit'),
				},
			});
		}

		return body;
	}
}
