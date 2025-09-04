import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	personUrlParameter,
} from '../shared/SharedParameters';

export const removeConnectionFields: INodeProperties[] = [
	createRequestOperation(
		'removeConnection',
		{
			personUrl: '={{$parameter["personUrl"]}}',
		},
		{
			resource: ['standard'],
			operation: ['removeConnection'],
		},
	),
	createParameterWithDisplayOptions(personUrlParameter, {
		resource: ['standard'],
		operation: ['removeConnection'],
	}),
];
