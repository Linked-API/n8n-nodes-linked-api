import type {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import {
	availableSalesNavigatorOperations,
	availableStandardOperations,
} from './descriptions/AvailableOperations';
import { availableModes } from './descriptions/AvailableModes';
import {
	fetchPersonFields,
	fetchCompanyFields,
	searchCompaniesFields,
	nvSearchCompaniesFields,
} from './operations';

export class LinkedApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Linked API',
		name: 'linkedApi',
		icon: {
			light: 'file:linked-api-light.svg',
			dark: 'file:linked-api-dark.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Control your LinkedIn accounts and retrieve real-time data.',
		defaults: {
			name: 'Linked API',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'linkedApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'http://localhost:3004',
			url: '/automation/execute',
			method: 'POST',
			headers: {
				'client': 'n8n',
				'Content-Type': 'application/json',
				'linked-api-token': '={{$credentials.linkedApiToken}}',
				'identification-token': '={{$credentials.identificationToken}}',
			},
		},
		properties: [
			availableModes,
			availableStandardOperations,
			availableSalesNavigatorOperations,
			// Webhook URL field (common to all operations)
			{
				displayName: 'Webhook URL',
				name: 'webhookUrl',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'https://n8n.your-domain.com/webhook-test/your-webhook-ID',
				description: 'URL where the response will be sent via webhook',
			},
			// Import operation fields from separate files
			...fetchPersonFields,
			...fetchCompanyFields,
			...searchCompaniesFields,
			...nvSearchCompaniesFields,
		],
	};
}
