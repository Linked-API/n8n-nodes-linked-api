import type { INodeProperties } from 'n8n-workflow';
import { createRequestOperation } from '../shared/SharedParameters';

const show = {
	resource: ['standard'],
	operation: ['retrievePendingRequests'],
};

export const retrievePendingRequestsFields: INodeProperties[] = [
	createRequestOperation(
		'retrievePendingRequests',
		{},
		show,
	),
];
