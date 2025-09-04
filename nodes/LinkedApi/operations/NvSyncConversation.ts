import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	personUrlParameter,
} from '../shared/SharedParameters';

export const nvSyncConversationFields: INodeProperties[] = [
	createRequestOperation(
		'nvSyncConversation',
		{
			personUrl: '={{$parameter["personUrl"]}}',
		},
		{
			resource: ['salesNavigator'],
			operation: ['nvSyncConversation'],
		},
	),
	// Parameter fields (no routing, just UI)
	createParameterWithDisplayOptions(personUrlParameter, {
		resource: ['salesNavigator'],
		operation: ['nvSyncConversation'],
	}),
];
