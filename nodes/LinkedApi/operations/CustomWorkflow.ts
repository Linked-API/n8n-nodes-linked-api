import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	workflowDefinitionParameter,
} from '../shared/SharedParameters';

export const customWorkflowFields: INodeProperties[] = [
	{
		displayName: '',
		name: `customWorkflowOperation`,
		type: 'hidden',
		displayOptions: {
			show: {
				operation: ['customWorkflow'],
			},
		},
		default: '',
		routing: {
			request: {
				body: {
					operationName: 'customWorkflow',
					webhookUrl: '={{$parameter["webhookUrl"]}}',
					data: '={{JSON.parse($parameter["workflowDefinition"])}}',
				},
			},
		},
	},
	createParameterWithDisplayOptions(workflowDefinitionParameter, {
		operation: ['customWorkflow'],
	}),
];
