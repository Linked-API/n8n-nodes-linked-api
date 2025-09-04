import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	personHashedUrlParameter,
} from '../shared/SharedParameters';

export const nvFetchPersonFields: INodeProperties[] = [
	createRequestOperation(
		'nvFetchPerson',
		{
			personHashedUrl: '={{$parameter["personHashedUrl"]}}',
		},
		{
			resource: ['salesNavigator'],
			operation: ['nvFetchPerson'],
		},
	),
	createParameterWithDisplayOptions(personHashedUrlParameter, {
		resource: ['salesNavigator'],
		operation: ['nvFetchPerson'],
	}),
];
