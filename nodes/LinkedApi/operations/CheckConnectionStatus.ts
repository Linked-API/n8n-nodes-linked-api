import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	personUrlParameter,
} from '../shared/SharedParameters';

const show = {
	resource: ['standard'],
	operation: ['checkConnectionStatus'],
};

export const checkConnectionStatusFields: INodeProperties[] = [
	createRequestOperation(
		'checkConnectionStatus',
		{
			personUrl: '={{$parameter["personUrl"]}}',
		},
		show,
	),
	// Parameter fields (no routing, just UI)
	createParameterWithDisplayOptions(personUrlParameter, show),
];
