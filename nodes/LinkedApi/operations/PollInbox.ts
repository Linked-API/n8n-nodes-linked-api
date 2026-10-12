import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { createParameterWithDisplayOptions } from '../shared/SharedParameters';
import { LinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';

const inboxSinceParameter: INodeProperties = {
	displayName: 'Since',
	name: 'since',
	type: 'dateTime',
	default: '',
	description:
		'Only return messages at or after this timestamp. If empty, all captured messages are returned. Message times are whole minutes.',
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

const inboxPersonUrlParameter: INodeProperties = {
	displayName: 'Person URL',
	name: 'personUrl',
	type: 'string',
	default: '',
	placeholder: 'https://www.linkedin.com/in/john-doe',
	description:
		'Return the whole known conversation with this person instead of the whole inbox, including history loaded by Sync Conversation; the output then has messages and threads. A hashed URL always matches; a public URL matches only once Linked API knows it.',
};

export class PollInbox extends LinkedApiOperation {
	operationName = AVAILABLE_ACTION.pollInbox;
	resource = 'other' as const;
	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(inboxSinceParameter, this.show),
		createParameterWithDisplayOptions(inboxTypeParameter, this.show),
		createParameterWithDisplayOptions(inboxThreadIdParameter, this.show),
		createParameterWithDisplayOptions(inboxPersonUrlParameter, this.show),
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
		const personUrl = this.stringParameter(context, 'personUrl');
		if (since) {
			request.since = since;
		}
		if (type) {
			request.type = type;
		}
		if (threadId) {
			request.threadId = threadId;
		}
		if (personUrl) {
			request.personUrl = personUrl;
		}
		return request;
	};
}
