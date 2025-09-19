import type { INodeProperties } from 'n8n-workflow';

export const availableGroups: INodeProperties = {
	displayName: 'Group',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Standard Interface',
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
