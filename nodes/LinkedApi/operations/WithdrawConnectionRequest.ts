import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	personUrlParameter,
	unfollowParameter,
} from '../shared/SharedParameters';

export const withdrawConnectionRequestFields: INodeProperties[] = [
	createRequestOperation(
		'withdrawConnectionRequest',
		{
			personUrl: '={{$parameter["personUrl"]}}',
			unfollow: '={{$parameter["unfollow"]}}',
		},
		{
			resource: ['standard'],
			operation: ['withdrawConnectionRequest'],
		},
	),
	// Parameter fields (no routing, just UI)
	createParameterWithDisplayOptions(personUrlParameter, {
		resource: ['standard'],
		operation: ['withdrawConnectionRequest'],
	}),
	createParameterWithDisplayOptions(unfollowParameter, {
		resource: ['standard'],
		operation: ['withdrawConnectionRequest'],
	}),
];
