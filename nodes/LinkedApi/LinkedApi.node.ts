import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';
import {
	availableOtherOperations,
	availableSalesNavigatorOperations,
	availableStandardOperations,
} from './shared/AvailableActions';
import { availableGroups } from './shared/AvailableGroups';
import {
	getWorkflowResultFields,
	RetrieveSSI,
	NvFetchCompany,
	NvFetchPerson,
	NvSearchCompanies,
	NvSearchPeople,
	NvSendMessage,
	NvSyncConversation,
	CustomWorkflow,
	CheckConnectionStatus,
	CommentOnPost,
	FetchCompany,
	FetchPerson,
	FetchPost,
	ReactToPost,
	RemoveConnection,
	RetrieveConnections,
	RetrievePendingRequests,
	RetrievePerformance,
	SearchCompanies,
	SearchPeople,
	SendConnectionRequest,
	SendMessage,
	SyncConversation,
	WithdrawConnectionRequest,
} from './operations';
import { LinkedApiWebhookOperation } from './shared/LinkedApiOperation';

const operations: Record<string, LinkedApiWebhookOperation> = {
	checkConnectionStatus: new CheckConnectionStatus(),
	commentOnPost: new CommentOnPost(),
	fetchPerson: new FetchPerson(),
	fetchCompany: new FetchCompany(),
	fetchPost: new FetchPost(),
	reactToPost: new ReactToPost(),
	removeConnection: new RemoveConnection(),
	retrieveConnections: new RetrieveConnections(),
	retrievePendingRequests: new RetrievePendingRequests(),
	retrievePerformance: new RetrievePerformance(),
	searchCompanies: new SearchCompanies(),
	searchPeople: new SearchPeople(),
	sendConnectionRequest: new SendConnectionRequest(),
	sendMessage: new SendMessage(),
	syncConversation: new SyncConversation(),
	withdrawConnectionRequest: new WithdrawConnectionRequest(),
	retrieveSSI: new RetrieveSSI(),
	nvFetchCompany: new NvFetchCompany(),
	nvFetchPerson: new NvFetchPerson(),
	nvSearchCompanies: new NvSearchCompanies(),
	nvSearchPeople: new NvSearchPeople(),
	nvSendMessage: new NvSendMessage(),
	nvSyncConversation: new NvSyncConversation(),
	customWorkflow: new CustomWorkflow(),
};

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
		properties: [
			availableGroups,
			availableStandardOperations,
			availableSalesNavigatorOperations,
			availableOtherOperations,
			// Standard actions
			...operations.checkConnectionStatus.operationFields,
			...operations.commentOnPost.operationFields,
			...operations.fetchPerson.operationFields,
			...operations.fetchCompany.operationFields,
			...operations.fetchPost.operationFields,
			...operations.reactToPost.operationFields,
			...operations.removeConnection.operationFields,
			...operations.retrieveConnections.operationFields,
			...operations.retrievePendingRequests.operationFields,
			...operations.retrievePerformance.operationFields,
			...operations.searchCompanies.operationFields,
			...operations.searchPeople.operationFields,
			...operations.sendConnectionRequest.operationFields,
			...operations.sendMessage.operationFields,
			...operations.syncConversation.operationFields,
			...operations.withdrawConnectionRequest.operationFields,
			...operations.retrieveSSI.operationFields,
			// Sales Navigator actions
			...operations.nvFetchCompany.operationFields,
			...operations.nvFetchPerson.operationFields,
			...operations.nvSearchCompanies.operationFields,
			...operations.nvSearchPeople.operationFields,
			...operations.nvSendMessage.operationFields,
			...operations.nvSyncConversation.operationFields,
			// Other actions
			...operations.customWorkflow.operationFields,
			...getWorkflowResultFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const operation = this.getNodeParameter('operation', 0) as string;
		const credentials = await this.getCredentials('linkedApi');

		if (credentials === undefined) {
			throw new NodeOperationError(this.getNode(), 'No credentials got returned!');
		}

		if (operation === 'getWorkflowResult') {
			const workflowId = this.getNodeParameter('workflowId', 0) as string;
			const workflowOperation = this.getNodeParameter('workflowOperation', 0) as string;

			try {
				const responseData = await this.helpers.httpRequest({
					method: 'GET',
					baseURL: 'https://api.linkedapi.io/automation',
					url: `/workflows/${workflowId}`,
					qs: {
						operationName: workflowOperation,
					},
					headers: {
						'identification-token': credentials.identificationToken as string,
						'linked-api-token': credentials.linkedApiToken as string,
						'client': 'n8n',
						'result-retrieval': 'webhook',
					},
					json: true,
				});
				const executionData = this.helpers.returnJsonArray(
					Array.isArray(responseData) ? responseData : [responseData],
				);
				return this.prepareOutputData(executionData);
			} catch (error) {
				console.error('Error during "getWorkflowResult" httpRequest:', error);
				throw error;
			}
		}
		try {
			const responseData = await operations[operation].execute(this);
			return this.prepareOutputData(this.helpers.returnJsonArray(responseData));
		} catch (error) {
			console.error('Error during httpRequest:', error);
			throw error; // Re-throw the error to make it visible in the n8n UI
		}
	}
}
