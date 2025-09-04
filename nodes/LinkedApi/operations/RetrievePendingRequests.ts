import type { INodeProperties } from 'n8n-workflow';
import { createRequestOperation } from '../shared/SharedParameters';

export const retrievePendingRequestsFields: INodeProperties[] = [
	createRequestOperation(
		'retrievePendingRequests',
		{},
		{
			resource: ['standard'],
			operation: ['retrievePendingRequests'],
		},
	),
];
