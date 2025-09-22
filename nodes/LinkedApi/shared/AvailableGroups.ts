import type { INodeProperties } from 'n8n-workflow';

export const LINKED_API_GROUP = {
	standard: 'standard',
	salesNavigator: 'salesNavigator',
	other: 'other',
}
export type TGroup = (typeof LINKED_API_GROUP)[keyof typeof LINKED_API_GROUP];

export const availableGroups: INodeProperties = {
	displayName: 'Group',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Standard Interface',
			value: LINKED_API_GROUP.standard,
		},
		{
			name: 'Sales Navigator',
			value: LINKED_API_GROUP.salesNavigator,
		},
		{
			name: 'Other',
			value: LINKED_API_GROUP.other,
		},
	],
	default: LINKED_API_GROUP.standard.toString(),
};
