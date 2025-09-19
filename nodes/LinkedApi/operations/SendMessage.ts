import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	personUrlParameter,
	messageTextParameter,
} from '../shared/SharedParameters';

const show = {
	resource: ['standard'],
	operation: ['sendMessage'],
};

export const sendMessageFields: INodeProperties[] = [
	createRequestOperation(
		'sendMessage',
		{
			personUrl: '={{$parameter["personUrl"]}}',
			text: '={{$parameter["messageText"]}}',
		},
		show,
	),
	// Parameter fields (no routing, just UI)
	createParameterWithDisplayOptions(personUrlParameter, show),
	createParameterWithDisplayOptions(messageTextParameter, show),
];
