import { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	workflowIdParameter,
	workflowOperationParameter,
} from '../shared/SharedParameters';

export const getWorkflowResultFields: INodeProperties[] = [
	{
		displayName: '',
		name: 'getWorkflowResultOperation',
		type: 'hidden',
		displayOptions: {
			show: {
				operation: ['getWorkflowResult'],
			},
		},
		default: '',
		routing: {
			request: {
				method: 'GET',
				url: '=/status/{{$parameter["workflowId"]}}',
				qs: {
					operationName: '={{$parameter["workflowOperation"]}}',
				},
			},
		},
	},
	createParameterWithDisplayOptions(workflowIdParameter, {
		operation: ['getWorkflowResult'],
	}),
	createParameterWithDisplayOptions(workflowOperationParameter, {
		operation: ['getWorkflowResult'],
	}),
];
