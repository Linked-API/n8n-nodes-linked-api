/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import type { INodeProperties, INodePropertyOptions } from 'n8n-workflow';

export const availableStandardOperations: INodeProperties = {
	displayName: 'Action',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['standard'],
		},
	},
	options: [
		{
			name: 'Check Connection Status',
			value: 'checkConnectionStatus',
			description: 'Check the connection status between your account and another person',
			action: 'Check connection status',
		},
		{
			name: 'Comment on Post',
			value: 'commentOnPost',
			description: 'Leave a comment on a LinkedIn post',
			action: 'Comment on post',
		},
		{
			name: 'Fetch Company',
			value: 'fetchCompany',
			description: 'Fetch detailed information about a LinkedIn company',
			action: 'Fetch a company',
		},
		{
			name: 'Fetch Person',
			value: 'fetchPerson',
			description: 'Fetch detailed information about a LinkedIn person',
			action: 'Fetch a person',
		},
		{
			name: 'Fetch Post',
			value: 'fetchPost',
			description: 'Retrieve detailed information about a LinkedIn post',
			action: 'Fetch a post',
		},
		{
			name: 'React to Post',
			value: 'reactToPost',
			description:
				'React to a LinkedIn post with like, celebrate, support, love, insightful, or funny',
			action: 'React to post',
		},
		{
			name: 'Remove Connection',
			value: 'removeConnection',
			description: 'Remove a person from your connections',
			action: 'Remove a connection',
		},
		{
			name: 'Retrieve Connections',
			value: 'retrieveConnections',
			description: 'Retrieve your connections with optional filtering',
			action: 'Retrieve connections',
		},
		{
			name: 'Retrieve Pending Requests',
			value: 'retrievePendingRequests',
			description: 'Retrieve pending connection requests sent from your account',
			action: 'Retrieve pending requests',
		},
		{
			name: 'Retrieve Performance',
			value: 'retrievePerformance',
			description: 'Retrieve performance analytics from your LinkedIn dashboard',
			action: 'Retrieve performance',
		},
		{
			name: 'Retrieve SSI',
			value: 'retrieveSSI',
			description: 'Retrieve your current Social Selling Index (SSI) score',
			action: 'Retrieve SSI',
		},
		{
			name: 'Search Companies',
			value: 'searchCompanies',
			description: 'Search for companies on LinkedIn',
			action: 'Search companies',
		},
		{
			name: 'Search People',
			value: 'searchPeople',
			description: 'Search for people on LinkedIn',
			action: 'Search people',
		},
		{
			name: 'Send Connection Request',
			value: 'sendConnectionRequest',
			description: 'Send a connection request to a person',
			action: 'Send connection request',
		},
		{
			name: 'Send Message',
			value: 'sendMessage',
			description: 'Send a message to a LinkedIn person',
			action: 'Send a message',
		},
		{
			name: 'Sync Conversation',
			value: 'syncConversation',
			description: 'Sync a conversation so you can start polling it for new messages',
			action: 'Sync a conversation',
		},
		{
			name: 'Withdraw Connection Request',
			value: 'withdrawConnectionRequest',
			description: 'Withdraw a connection request sent to a person',
			action: 'Withdraw connection request',
		},
	],
	default: 'searchCompanies',
};

export const availableSalesNavigatorOperations: INodeProperties = {
	displayName: 'Action',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['salesNavigator'],
		},
	},
	options: [
		{
			name: 'Fetch Company in Sales Navigator',
			value: 'nvFetchCompany',
			description: 'Fetch detailed information about a company in Sales Navigator',
			action: 'Fetch company in sales navigator',
		},
		{
			name: 'Fetch Person in Sales Navigator',
			value: 'nvFetchPerson',
			description: 'Fetch detailed information about a person in Sales Navigator',
			action: 'Fetch person in sales navigator',
		},
		{
			name: 'Search Companies in Sales Navigator',
			value: 'nvSearchCompanies',
			description: 'Search for companies in Sales Navigator',
			action: 'Search companies in sales navigator',
		},
		{
			name: 'Search People in Sales Navigator',
			value: 'nvSearchPeople',
			description: 'Search for people in Sales Navigator',
			action: 'Search people in sales navigator',
		},
		{
			name: 'Send Message in Sales Navigator',
			value: 'nvSendMessage',
			description: 'Send a message to a person in Sales Navigator',
			action: 'Send message in sales navigator',
		},
		{
			name: 'Sync Conversation in Sales Navigator',
			value: 'nvSyncConversation',
			description: 'Sync a conversation in Sales Navigator so you can start polling it',
			action: 'Sync conversation in sales navigator',
		},
	],
	default: 'nvSearchCompanies',
};

export const customWorkflowOption: INodePropertyOptions =
{
	name: 'Custom Workflow',
	value: 'customWorkflow',
	description: 'Execute a custom multi-step workflow using raw workflow definition',
	action: 'Execute custom workflow',
};

export const availableOtherOperations: INodeProperties = {
	displayName: 'Action',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	default: 'customWorkflow',
	displayOptions: {
		show: {
			resource: ['other'],
		},
	},
	options: [
		customWorkflowOption,
		{
			name: 'Get Workflow Result',
			value: 'getWorkflowResult',
			description: 'Get the result of workflow execution',
			action: 'Get workflow result',
		},
	],
};
