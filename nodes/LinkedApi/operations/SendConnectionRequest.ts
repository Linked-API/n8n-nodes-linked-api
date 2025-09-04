import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	personUrlParameter,
	connectionNoteParameter,
	emailParameter,
} from '../shared/SharedParameters';

export const sendConnectionRequestFields: INodeProperties[] = [
	createRequestOperation(
		'sendConnectionRequest',
		{
			personUrl: '={{$parameter["personUrl"]}}',
			note: '={{$parameter["connectionNote"] || undefined}}',
			email: '={{$parameter["email"] || undefined}}',
		},
		{
			resource: ['standard'],
			operation: ['sendConnectionRequest'],
		},
	),
	// Parameter fields (no routing, just UI)
	createParameterWithDisplayOptions(personUrlParameter, {
		resource: ['standard'],
		operation: ['sendConnectionRequest'],
	}),
	createParameterWithDisplayOptions(connectionNoteParameter, {
		resource: ['standard'],
		operation: ['sendConnectionRequest'],
	}),
	createParameterWithDisplayOptions(emailParameter, {
		resource: ['standard'],
		operation: ['sendConnectionRequest'],
	}),
];
