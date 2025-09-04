import type { INodeProperties } from 'n8n-workflow';
import { createRequestOperation } from '../shared/SharedParameters';

export const retrievePerformanceFields: INodeProperties[] = [
	createRequestOperation(
		'retrievePerformance',
		{},
		{
			resource: ['standard'],
			operation: ['retrievePerformance'],
		},
	),
];
