import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	postUrlParameter,
} from '../shared/SharedParameters';

const show = {
	resource: ['standard'],
	operation: ['fetchPost'],
};

export const fetchPostFields: INodeProperties[] = [
	createRequestOperation(
		'fetchPost',
		{
			postUrl: '={{$parameter["postUrl"]}}',
		},
		show,
	),
	// Parameter fields (no routing, just UI)
	createParameterWithDisplayOptions(postUrlParameter, show),
];
