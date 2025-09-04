import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	postUrlParameter,
	reactionTypeParameter,
} from '../shared/SharedParameters';

export const reactToPostFields: INodeProperties[] = [
	createRequestOperation(
		'reactToPost',
		{
			postUrl: '={{$parameter["postUrl"]}}',
			type: '={{$parameter["reactionType"]}}',
		},
		{
			resource: ['standard'],
			operation: ['reactToPost'],
		},
	),
	createParameterWithDisplayOptions(postUrlParameter, {
		resource: ['standard'],
		operation: ['reactToPost'],
	}),
	createParameterWithDisplayOptions(reactionTypeParameter, {
		resource: ['standard'],
		operation: ['reactToPost'],
	}),
];
