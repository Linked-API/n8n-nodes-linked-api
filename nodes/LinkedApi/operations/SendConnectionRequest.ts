import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	personUrlParameter,
	connectionNoteParameter,
	emailParameter,
} from '../shared/SharedParameters';

const show = {
	resource: ['standard'],
	operation: ['sendConnectionRequest'],
};

export const sendConnectionRequestFields: INodeProperties[] = [
	createRequestOperation(
		'sendConnectionRequest',
		{
			personUrl: '={{$parameter["personUrl"]}}',
			note: '={{$parameter["connectionNote"] || undefined}}',
			email: '={{$parameter["email"] || undefined}}',
		},
		show,
	),
	// Parameter fields (no routing, just UI)
	createParameterWithDisplayOptions(personUrlParameter, show),
	createParameterWithDisplayOptions(connectionNoteParameter, show),
	createParameterWithDisplayOptions(emailParameter, show),
];
