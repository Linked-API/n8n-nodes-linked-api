import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	personUrlParameter,
} from '../shared/SharedParameters';

const show = {
	resource: ['salesNavigator'],
	operation: ['nvSyncConversation'],
};

export const nvSyncConversationFields: INodeProperties[] = [
	createRequestOperation(
		'nvSyncConversation',
		{
			personUrl: '={{$parameter["personUrl"]}}',
		},
		show,
	),
	// Parameter fields (no routing, just UI)
	createParameterWithDisplayOptions(personUrlParameter, show),
];
