import type { INodeProperties } from 'n8n-workflow';

export const availableStandardOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['standard'],
		},
	},
	options: [
		{
			name: 'Fetch Person',
			value: 'fetchPerson',
			description: 'Fetch detailed information about a LinkedIn person',
			action: 'Fetch a person',
		},
		{
			name: 'Fetch Company',
			value: 'fetchCompany',
			description: 'Fetch detailed information about a LinkedIn company',
			action: 'Fetch a company',
		},
		{
			name: 'Search Companies',
			value: 'searchCompanies',
			description: 'Search for companies on LinkedIn',
			action: 'Search companies',
		},
	],
	default: 'searchCompanies',
};

export const availableSalesNavigatorOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['salesNavigator'],
		},
	},
	options: [
		{
			name: 'Search Companies in Sales Navigator',
			value: 'nvSearchCompanies',
			description: 'Search for companies in Sales Navigator',
			action: 'Search companies in sales navigator',
		},
	],
	default: 'nvSearchCompanies',
};
