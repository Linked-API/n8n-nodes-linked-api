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
	CreatePost,
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
	GetWorkflowResult,
	CancelWorkflow,
	PollConversations,
	ActionsUsageStatistics,
} from './operations';
import { LinkedApiOperation } from './shared/LinkedApiOperation';

const operations: Record<string, LinkedApiOperation> = {
	checkConnectionStatus: new CheckConnectionStatus(),
	commentOnPost: new CommentOnPost(),
	createPost: new CreatePost(),
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
	getWorkflowResult: new GetWorkflowResult(),
	cancelWorkflow: new CancelWorkflow(),
	pollConversations: new PollConversations(),
	actionsUsageStatistics: new ActionsUsageStatistics(),
};

export class LinkedApi implements INodeType {
	description: INodeTypeDescription = {
		documentationUrl: 'https://linkedapi.io/integrations/n8n/',
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
			...operations.createPost.operationFields,
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
			...operations.getWorkflowResult.operationFields,
			...operations.cancelWorkflow.operationFields,
			...operations.pollConversations.operationFields,
			...operations.actionsUsageStatistics.operationFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const operation = this.getNodeParameter('operation', 0) as string;
		const credentials = await this.getCredentials('linkedApi');

		if (credentials === undefined) {
			throw new NodeOperationError(this.getNode(), 'No credentials got returned!');
		}

		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const responseData = await operations[operation].execute(this);
				if (Array.isArray(responseData)) {
					for (const entry of responseData) {
						returnData.push({ json: entry, pairedItem: { item: i } });
					}
				} else {
					returnData.push({ json: responseData, pairedItem: { item: i } });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: (error as Error).message }, pairedItem: { item: i } });
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}
}
