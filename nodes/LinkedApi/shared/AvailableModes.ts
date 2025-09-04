import type { INodeProperties } from 'n8n-workflow';

export const availableModes: INodeProperties = {
	displayName: 'Mode',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Standard',
			value: 'standard',
		},
		{
			name: 'Sales Navigator',
			value: 'salesNavigator',
		},
		{
			name: 'Other',
			value: 'other',
		},
	],
	default: 'standard',
};
