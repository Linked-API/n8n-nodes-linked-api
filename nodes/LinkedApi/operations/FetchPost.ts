import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	postUrlParameter,
} from '../shared/SharedParameters';

export const fetchPostFields: INodeProperties[] = [
	createRequestOperation(
		'fetchPost',
		{
			postUrl: '={{$parameter["postUrl"]}}',
		},
		{
			resource: ['standard'],
			operation: ['fetchPost'],
		},
	),
	// Parameter fields (no routing, just UI)
	createParameterWithDisplayOptions(postUrlParameter, {
		resource: ['standard'],
		operation: ['fetchPost'],
	}),
];
