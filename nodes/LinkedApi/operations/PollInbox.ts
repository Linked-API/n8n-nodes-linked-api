import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { createParameterWithDisplayOptions } from '../shared/SharedParameters';
import { LinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';

const inboxSinceParameter: INodeProperties = {
	displayName: 'Since',
	name: 'since',
	type: 'dateTime',
	default: '',
	description: 'Only return messages after this timestamp. If empty, all captured messages are returned.',
};

const inboxTypeParameter: INodeProperties = {
	displayName: 'Type',
	name: 'type',
	type: 'options',
	default: '',
	// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
	options: [
		{ name: 'Both', value: '' },
		{ name: 'Standard', value: 'st' },
		{ name: 'Sales Navigator', value: 'nv' },
	],
	description: 'Filter messages by inbox type',
};

const inboxThreadIdParameter: INodeProperties = {
	displayName: 'Thread ID',
	name: 'threadId',
	type: 'string',
	default: '',
	description: 'Restrict the result to a single conversation thread',
};

export class PollInbox extends LinkedApiOperation {
	operationName = AVAILABLE_ACTION.pollInbox;
	resource = 'other' as const;
	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(inboxSinceParameter, this.show),
		createParameterWithDisplayOptions(inboxTypeParameter, this.show),
		createParameterWithDisplayOptions(inboxThreadIdParameter, this.show),
	];
	url = (_: IExecuteFunctions): string => '/inbox/poll';
	method = 'POST' as const;
	qs = (_: IExecuteFunctions): Record<string, any> | undefined => {
		return undefined;
	};
	requestBody = (context: IExecuteFunctions): Record<string, any> | undefined => {
		const request: Record<string, any> = {};
		const since = this.stringParameter(context, 'since');
		const type = this.stringParameter(context, 'type');
		const threadId = this.stringParameter(context, 'threadId');
		if (since) {
			request.since = since;
		}
		if (type) {
			request.type = type;
		}
		if (threadId) {
			request.threadId = threadId;
		}
		return request;
	};
}
