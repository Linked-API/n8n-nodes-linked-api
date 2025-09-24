/* eslint-disable n8n-nodes-base/node-param-operation-option-action-miscased */
/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export const AVAILABLE_ACTION = {
	checkConnectionStatus: 'checkConnectionStatus',
	commentOnPost: 'commentOnPost',
	fetchCompany: 'fetchCompany',
	fetchPerson: 'fetchPerson',
	fetchPost: 'fetchPost',
	reactToPost: 'reactToPost',
	removeConnection: 'removeConnection',
	retrieveConnections: 'retrieveConnections',
	retrievePendingRequests: 'retrievePendingRequests',
	retrievePerformance: 'retrievePerformance',
	retrieveSSI: 'retrieveSSI',
	searchCompanies: 'searchCompanies',
	searchPeople: 'searchPeople',
	sendConnectionRequest: 'sendConnectionRequest',
	sendMessage: 'sendMessage',
	syncConversation: 'syncConversation',
	withdrawConnectionRequest: 'withdrawConnectionRequest',
	nvFetchCompany: 'nvFetchCompany',
	nvFetchPerson: 'nvFetchPerson',
	nvSearchCompanies: 'nvSearchCompanies',
	nvSearchPeople: 'nvSearchPeople',
	nvSendMessage: 'nvSendMessage',
	nvSyncConversation: 'nvSyncConversation',
	customWorkflow: 'customWorkflow',
	getWorkflowResult: 'getWorkflowResult',
	cancelWorkflow: 'cancelWorkflow',
	pollConversations: 'pollConversations',
	actionsUsageStatistics: 'actionsUsageStatistics',
} as const;
export type TAvailableAction = (typeof AVAILABLE_ACTION)[keyof typeof AVAILABLE_ACTION];

export const availableStandardOperations: INodeProperties = {
	displayName: 'Action',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	default: AVAILABLE_ACTION.searchCompanies.toString(),
	displayOptions: {
		show: {
			resource: ['standard'],
		},
	},
	options: [
		{
			name: 'Check Connection Status',
			value: AVAILABLE_ACTION.checkConnectionStatus,
			description: 'Check the connection status between your account and another person',
			action: 'Check connection status',
		},
		{
			name: 'Comment on Post',
			value: AVAILABLE_ACTION.commentOnPost,
			description: 'Leave a comment on a LinkedIn post',
			action: 'Comment on post',
		},
		{
			name: 'Fetch Company',
			value: AVAILABLE_ACTION.fetchCompany,
			description: 'Fetch detailed information about a LinkedIn company',
			action: 'Fetch company',
		},
		{
			name: 'Fetch Person',
			value: AVAILABLE_ACTION.fetchPerson,
			description: 'Fetch detailed information about a LinkedIn person',
			action: 'Fetch person',
		},
		{
			name: 'Fetch Post',
			value: AVAILABLE_ACTION.fetchPost,
			description: 'Retrieve detailed information about a LinkedIn post',
			action: 'Fetch post',
		},
		{
			name: 'React to Post',
			value: AVAILABLE_ACTION.reactToPost,
			description:
				'React to a LinkedIn post with like, celebrate, support, love, insightful, or funny',
			action: 'React to post',
		},
		{
			name: 'Remove Connection',
			value: AVAILABLE_ACTION.removeConnection,
			description: 'Remove a person from your connections',
			action: 'Remove connection',
		},
		{
			name: 'Retrieve Connections',
			value: AVAILABLE_ACTION.retrieveConnections,
			description: 'Retrieve your connections with optional filtering',
			action: 'Retrieve connections',
		},
		{
			name: 'Retrieve Pending Requests',
			value: AVAILABLE_ACTION.retrievePendingRequests,
			description: 'Retrieve pending connection requests sent from your account',
			action: 'Retrieve pending requests',
		},
		{
			name: 'Retrieve Performance',
			value: AVAILABLE_ACTION.retrievePerformance,
			description: 'Retrieve performance analytics from your LinkedIn dashboard',
			action: 'Retrieve performance',
		},
		{
			name: 'Retrieve SSI',
			value: AVAILABLE_ACTION.retrieveSSI,
			description: 'Retrieve your current Social Selling Index (SSI) score',
			action: 'Retrieve SSI',
		},
		{
			name: 'Search Companies',
			value: AVAILABLE_ACTION.searchCompanies,
			description: 'Search for companies on LinkedIn',
			action: 'Search companies',
		},
		{
			name: 'Search People',
			value: AVAILABLE_ACTION.searchPeople,
			description: 'Search for people on LinkedIn',
			action: 'Search people',
		},
		{
			name: 'Send Connection Request',
			value: AVAILABLE_ACTION.sendConnectionRequest,
			description: 'Send a connection request to a person',
			action: 'Send connection request',
		},
		{
			name: 'Send Message',
			value: AVAILABLE_ACTION.sendMessage,
			description: 'Send a message to a LinkedIn person',
			action: 'Send message',
		},
		{
			name: 'Sync Conversation',
			value: AVAILABLE_ACTION.syncConversation,
			description: 'Sync a conversation so you can start polling it for new messages',
			action: 'Sync conversation',
		},
		{
			name: 'Withdraw Connection Request',
			value: AVAILABLE_ACTION.withdrawConnectionRequest,
			description: 'Withdraw a connection request sent to a person',
			action: 'Withdraw connection request',
		},
	],
};

export const availableSalesNavigatorOperations: INodeProperties = {
	displayName: 'Action',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	default: AVAILABLE_ACTION.nvSearchCompanies.toString(),
	displayOptions: {
		show: {
			resource: ['salesNavigator'],
		},
	},
	options: [
		{
			name: 'Fetch Company in Sales Navigator',
			value: AVAILABLE_ACTION.nvFetchCompany,
			description: 'Fetch detailed information about a company in Sales Navigator',
			action: 'Fetch company in Sales Navigator',
		},
		{
			name: 'Fetch Person in Sales Navigator',
			value: AVAILABLE_ACTION.nvFetchPerson,
			description: 'Fetch detailed information about a person in Sales Navigator',
			action: 'Fetch person in Sales Navigator',
		},
		{
			name: 'Search Companies in Sales Navigator',
			value: AVAILABLE_ACTION.nvSearchCompanies,
			description: 'Search for companies in Sales Navigator',
			action: 'Search companies in Sales Navigator',
		},
		{
			name: 'Search People in Sales Navigator',
			value: AVAILABLE_ACTION.nvSearchPeople,
			description: 'Search for people in Sales Navigator',
			action: 'Search people in Sales Navigator',
		},
		{
			name: 'Send Message in Sales Navigator',
			value: AVAILABLE_ACTION.nvSendMessage,
			description: 'Send a message to a person in Sales Navigator',
			action: 'Send message in Sales Navigator',
		},
		{
			name: 'Sync Conversation in Sales Navigator',
			value: AVAILABLE_ACTION.nvSyncConversation,
			description: 'Sync a conversation in Sales Navigator so you can start polling it',
			action: 'Sync conversation in Sales Navigator',
		},
	],
};

export const customWorkflowOption: INodePropertyOptions =
{
	name: 'Custom Workflow',
	value: AVAILABLE_ACTION.customWorkflow,
	description: 'Execute a custom multi-step workflow using raw workflow definition',
	action: 'Execute custom workflow',
};

export const availableOtherOperations: INodeProperties = {
	displayName: 'Action',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	default: AVAILABLE_ACTION.customWorkflow.toString(),
	displayOptions: {
		show: {
			resource: ['other'],
		},
	},
	options: [
		{
			name: 'Custom Workflow',
			value: AVAILABLE_ACTION.customWorkflow,
			description: 'Execute a custom multi-step workflow using raw workflow definition',
			action: 'Execute custom workflow',
		},
		{
			name: 'Get Workflow Result',
			value: AVAILABLE_ACTION.getWorkflowResult,
			description: 'Get the result of workflow execution',
			action: 'Get workflow result',
		},
		{
			name: 'Cancel Workflow',
			value: AVAILABLE_ACTION.cancelWorkflow,
			description: 'Cancel a running workflow execution',
			action: 'Cancel workflow',
		},
		{
			name: 'Poll Conversations',
			value: AVAILABLE_ACTION.pollConversations,
			description: 'Poll multiple conversations for new messages',
			action: 'Poll conversations',
		},
		{
			name: 'Actions Usage Statistics',
			value: AVAILABLE_ACTION.actionsUsageStatistics,
			description: 'Get actions usage statistics for a date range',
			action: 'Get actions statistics',
		},
	],
};
