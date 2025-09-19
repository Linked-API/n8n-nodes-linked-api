/* eslint-disable n8n-nodes-base/node-param-multi-options-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-display-name-miscased */
import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	companyHashedUrlParameter,
	employeeLimitParameter,
	dmsLimitParameter,
} from '../shared/SharedParameters';

const show = {
	resource: ['salesNavigator'],
	operation: ['nvFetchCompany'],
};

export const nvFetchCompanyFields: INodeProperties[] = [
	createRequestOperation(
		'nvFetchCompany',
		{
			companyHashedUrl: '={{$parameter["companyHashedUrl"]}}',
			retrieveEmployees: '={{$parameter["retrieveEmployees"] || false}}',
			retrieveDMs: '={{$parameter["retrieveDMs"] || false}}',
			employeesRetrievalConfig:
				'={{$parameter["retrieveEmployees"] ? {limit: $parameter["employeeLimit"], filter: $parameter["additionalEmployeeFields"] ? {firstName: $parameter["additionalEmployeeFields"].firstName || undefined, lastName: $parameter["additionalEmployeeFields"].lastName || undefined, positions: $parameter["additionalEmployeeFields"].positions ? $parameter["additionalEmployeeFields"].positions.split(";").map(s => s.trim()).filter(s => s) : undefined, locations: $parameter["additionalEmployeeFields"].locations ? $parameter["additionalEmployeeFields"].locations.split(";").map(s => s.trim()).filter(s => s) : undefined, industries: $parameter["additionalEmployeeFields"].industries ? $parameter["additionalEmployeeFields"].industries.split(";").map(s => s.trim()).filter(s => s) : undefined, schools: $parameter["additionalEmployeeFields"].schools ? $parameter["additionalEmployeeFields"].schools.split(";").map(s => s.trim()).filter(s => s) : undefined, yearsOfExperiences: $parameter["additionalEmployeeFields"].yearsOfExperiences || undefined} : undefined} : undefined}}',
			dmsRetrievalConfig:
				'={{$parameter["retrieveDMs"] ? {limit: $parameter["dmsLimit"]} : undefined}}',
		},
		show,
	),
	createParameterWithDisplayOptions(companyHashedUrlParameter, show),
	// Employees
	{
		displayName: 'Retrieve Employees',
		name: 'retrieveEmployees',
		type: 'boolean',
		default: false,
		description: 'Whether to retrieve company employees',
		displayOptions: {
			show,
		},
	},
	createParameterWithDisplayOptions(employeeLimitParameter, {
		...show,
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
				...show,
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
			show,
		},
	},
	createParameterWithDisplayOptions(dmsLimitParameter, {
		...show,
		retrieveDMs: [true],
	}),
];
