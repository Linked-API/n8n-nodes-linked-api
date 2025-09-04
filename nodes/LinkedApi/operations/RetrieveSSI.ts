import type { INodeProperties } from 'n8n-workflow';
import { createRequestOperation } from '../shared/SharedParameters';

export const retrieveSSIFields: INodeProperties[] = [
	createRequestOperation(
		'retrieveSSI',
		{},
		{
			resource: ['standard'],
			operation: ['retrieveSSI'],
		},
	),
];
