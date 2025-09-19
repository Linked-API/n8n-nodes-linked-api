import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	personUrlParameter,
	messageTextParameter,
	messageSubjectParameter,
} from '../shared/SharedParameters';

const show = {
	resource: ['salesNavigator'],
	operation: ['nvSendMessage'],
};

export const nvSendMessageFields: INodeProperties[] = [
	createRequestOperation(
		'nvSendMessage',
		{
			personUrl: '={{$parameter["personUrl"]}}',
			text: '={{$parameter["messageText"]}}',
			subject: '={{$parameter["messageSubject"]}}',
		},
		show,
	),
	createParameterWithDisplayOptions(personUrlParameter, show),
	createParameterWithDisplayOptions(messageSubjectParameter, show),
	createParameterWithDisplayOptions(messageTextParameter, show),
];
