import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	personUrlParameter,
	messageTextParameter,
	messageSubjectParameter,
} from '../shared/SharedParameters';

export const nvSendMessageFields: INodeProperties[] = [
	createRequestOperation(
		'nvSendMessage',
		{
			personUrl: '={{$parameter["personUrl"]}}',
			text: '={{$parameter["messageText"]}}',
			subject: '={{$parameter["messageSubject"]}}',
		},
		{
			resource: ['salesNavigator'],
			operation: ['nvSendMessage'],
		},
	),
	createParameterWithDisplayOptions(personUrlParameter, {
		resource: ['salesNavigator'],
		operation: ['nvSendMessage'],
	}),
	createParameterWithDisplayOptions(messageSubjectParameter, {
		resource: ['salesNavigator'],
		operation: ['nvSendMessage'],
	}),
	createParameterWithDisplayOptions(messageTextParameter, {
		resource: ['salesNavigator'],
		operation: ['nvSendMessage'],
	}),
];
