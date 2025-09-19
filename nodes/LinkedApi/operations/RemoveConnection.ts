import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	personUrlParameter,
} from '../shared/SharedParameters';

const show = {
	resource: ['standard'],
	operation: ['removeConnection'],
};

export const removeConnectionFields: INodeProperties[] = [
	createRequestOperation(
		'removeConnection',
		{
			personUrl: '={{$parameter["personUrl"]}}',
		},
		show,
	),
	createParameterWithDisplayOptions(personUrlParameter, show),
];
