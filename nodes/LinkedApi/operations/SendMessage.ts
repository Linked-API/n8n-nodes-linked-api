import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	personUrlParameter,
	messageTextParameter,
} from '../shared/SharedParameters';

export const sendMessageFields: INodeProperties[] = [
	createRequestOperation(
		'sendMessage',
		{
			personUrl: '={{$parameter["personUrl"]}}',
			text: '={{$parameter["messageText"]}}',
		},
		{
			resource: ['standard'],
			operation: ['sendMessage'],
		},
	),
	// Parameter fields (no routing, just UI)
	createParameterWithDisplayOptions(personUrlParameter, {
		resource: ['standard'],
		operation: ['sendMessage'],
	}),
	createParameterWithDisplayOptions(messageTextParameter, {
		resource: ['standard'],
		operation: ['sendMessage'],
	}),
];
