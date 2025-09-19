import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	postUrlParameter,
	commentTextParameter,
} from '../shared/SharedParameters';

const show = {
	resource: ['standard'],
	operation: ['commentOnPost'],
};

export const commentOnPostFields: INodeProperties[] = [
	createRequestOperation(
		'commentOnPost',
		{
			postUrl: '={{$parameter["postUrl"]}}',
			text: '={{$parameter["commentText"]}}',
		},
		show,
	),
	createParameterWithDisplayOptions(postUrlParameter, show),
	createParameterWithDisplayOptions(commentTextParameter, show),
];
