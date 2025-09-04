import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	personUrlParameter,
} from '../shared/SharedParameters';

export const syncConversationFields: INodeProperties[] = [
	createRequestOperation(
		'syncConversation',
		{
			personUrl: '={{$parameter["personUrl"]}}',
		},
		{
			resource: ['standard'],
			operation: ['syncConversation'],
		},
	),
	// Parameter fields (no routing, just UI)
	createParameterWithDisplayOptions(personUrlParameter, {
		resource: ['standard'],
		operation: ['syncConversation'],
	}),
];
