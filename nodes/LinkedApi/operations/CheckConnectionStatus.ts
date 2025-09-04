import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	personUrlParameter,
} from '../shared/SharedParameters';

export const checkConnectionStatusFields: INodeProperties[] = [
	createRequestOperation(
		'checkConnectionStatus',
		{
			personUrl: '={{$parameter["personUrl"]}}',
		},
		{
			resource: ['standard'],
			operation: ['checkConnectionStatus'],
		},
	),
	// Parameter fields (no routing, just UI)
	createParameterWithDisplayOptions(personUrlParameter, {
		resource: ['standard'],
		operation: ['checkConnectionStatus'],
	}),
];
