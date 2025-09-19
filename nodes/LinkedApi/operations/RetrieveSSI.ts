import type { INodeProperties } from 'n8n-workflow';
import { createRequestOperation } from '../shared/SharedParameters';

const show = {
	resource: ['standard'],
	operation: ['retrieveSSI'],
};

export const retrieveSSIFields: INodeProperties[] = [
	createRequestOperation(
		'retrieveSSI',
		{},
		show,
	),
];
