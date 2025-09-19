import { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	workflowIdParameter,
	workflowOperationParameter,
} from '../shared/SharedParameters';

const show = {
	resource: ['other'],
	operation: ['getWorkflowResult'],
};

export const getWorkflowResultFields: INodeProperties[] = [
	{
		displayName: '',
		name: 'getWorkflowResultOperation',
		type: 'hidden',
		displayOptions: {
			show,
		},
		default: '',
		routing: {
			request: {
				method: 'GET',
				url: '=/workflows/{{$parameter["workflowId"]}}',
				qs: {
					operationName: '={{$parameter["workflowOperation"]}}',
				},
			},
		},
	},
	createParameterWithDisplayOptions(workflowIdParameter, show),
	createParameterWithDisplayOptions(workflowOperationParameter, show),
];
