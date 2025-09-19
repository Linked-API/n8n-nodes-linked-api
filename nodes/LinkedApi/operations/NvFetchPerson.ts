import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	personHashedUrlParameter,
} from '../shared/SharedParameters';

const show = {
	resource: ['salesNavigator'],
	operation: ['nvFetchPerson'],
};

export const nvFetchPersonFields: INodeProperties[] = [
	createRequestOperation(
		'nvFetchPerson',
		{
			personHashedUrl: '={{$parameter["personHashedUrl"]}}',
		},
		show,
	),
	createParameterWithDisplayOptions(personHashedUrlParameter, show),
];
