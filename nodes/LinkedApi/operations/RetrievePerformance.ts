import type { INodeProperties } from 'n8n-workflow';
import { createRequestOperation } from '../shared/SharedParameters';

const show = {
	resource: ['standard'],
	operation: ['retrievePerformance'],
};

export const retrievePerformanceFields: INodeProperties[] = [
	createRequestOperation(
		'retrievePerformance',
		{},
		show,
	),
];
