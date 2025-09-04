import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	postUrlParameter,
	commentTextParameter,
} from '../shared/SharedParameters';

export const commentOnPostFields: INodeProperties[] = [
	createRequestOperation(
		'commentOnPost',
		{
			postUrl: '={{$parameter["postUrl"]}}',
			text: '={{$parameter["commentText"]}}',
		},
		{
			resource: ['standard'],
			operation: ['commentOnPost'],
		},
	),
	createParameterWithDisplayOptions(postUrlParameter, {
		resource: ['standard'],
		operation: ['commentOnPost'],
	}),
	createParameterWithDisplayOptions(commentTextParameter, {
		resource: ['standard'],
		operation: ['commentOnPost'],
	}),
];
