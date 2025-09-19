import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	postUrlParameter,
	reactionTypeParameter,
} from '../shared/SharedParameters';

const show = {
	resource: ['standard'],
	operation: ['reactToPost'],
};

export const reactToPostFields: INodeProperties[] = [
	createRequestOperation(
		'reactToPost',
		{
			postUrl: '={{$parameter["postUrl"]}}',
			type: '={{$parameter["reactionType"]}}',
		},
		show,
	),
	createParameterWithDisplayOptions(postUrlParameter, show),
	createParameterWithDisplayOptions(reactionTypeParameter, show),
];
