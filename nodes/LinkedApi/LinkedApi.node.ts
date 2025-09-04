import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import {
	availableOtherOperations,
	availableSalesNavigatorOperations,
	availableStandardOperations,
} from './shared/AvailableOperations';
import { availableModes } from './shared/AvailableModes';
import {
	checkConnectionStatusFields,
	commentOnPostFields,
	customWorkflowFields,
	fetchPersonFields,
	fetchCompanyFields,
	fetchPostFields,
	getWorkflowResultFields,
	reactToPostFields,
	removeConnectionFields,
	retrieveConnectionsFields,
	retrievePendingRequestsFields,
	retrievePerformanceFields,
	retrieveSSIFields,
	searchCompaniesFields,
	searchPeopleFields,
	sendConnectionRequestFields,
	sendMessageFields,
	syncConversationFields,
	withdrawConnectionRequestFields,
	nvSearchCompaniesFields,
	nvSearchPeopleFields,
	nvSendMessageFields,
	nvSyncConversationFields,
	nvFetchPersonFields,
	nvFetchCompanyFields,
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
			baseURL: 'https://api.linkedapi.io/automation',
			url: '/execute',
			method: 'POST',
			headers: {
				client: 'n8n',
				'Content-Type': 'application/json',
				'linked-api-token': '={{$credentials.linkedApiToken}}',
				'identification-token': '={{$credentials.identificationToken}}',
			},
		},
		properties: [
			availableModes,
			availableStandardOperations,
			availableSalesNavigatorOperations,
			availableOtherOperations,
			// Webhook URL field (common to all operations)
			{
				displayName: 'Webhook URL',
				name: 'webhookUrl',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					hide: {
						operation: ['getWorkflowResult'],
					},
				},
				placeholder: 'https://n8n.your-domain.com/webhook-test/your-webhook-ID',
				description: 'URL where the response will be sent via webhook',
			},
			// Standard operations
			...checkConnectionStatusFields,
			...commentOnPostFields,
			...fetchPersonFields,
			...fetchCompanyFields,
			...fetchPostFields,
			...reactToPostFields,
			...removeConnectionFields,
			...retrieveConnectionsFields,
			...retrievePendingRequestsFields,
			...retrievePerformanceFields,
			...retrieveSSIFields,
			...searchCompaniesFields,
			...searchPeopleFields,
			...sendConnectionRequestFields,
			...sendMessageFields,
			...syncConversationFields,
			...withdrawConnectionRequestFields,
			// Sales Navigator operations
			...nvSearchCompaniesFields,
			...nvSearchPeopleFields,
			...nvSendMessageFields,
			...nvSyncConversationFields,
			...nvFetchPersonFields,
			...nvFetchCompanyFields,
			// Other operations
			...customWorkflowFields,
			...getWorkflowResultFields,
		],
	};
}
