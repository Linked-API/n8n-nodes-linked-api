import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	personUrlParameter,
	unfollowParameter,
} from '../shared/SharedParameters';

const show = {
	resource: ['standard'],
	operation: ['withdrawConnectionRequest'],
};

export const withdrawConnectionRequestFields: INodeProperties[] = [
	createRequestOperation(
		'withdrawConnectionRequest',
		{
			personUrl: '={{$parameter["personUrl"]}}',
			unfollow: '={{$parameter["unfollow"]}}',
		},
		show,
	),
	// Parameter fields (no routing, just UI)
	createParameterWithDisplayOptions(personUrlParameter, show),
	createParameterWithDisplayOptions(unfollowParameter, show),
];
