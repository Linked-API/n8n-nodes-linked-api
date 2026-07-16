import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { createParameterWithDisplayOptions } from '../shared/SharedParameters';
import { LinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';

const networkSinceParameter: INodeProperties = {
	displayName: 'Since',
	name: 'since',
	type: 'dateTime',
	default: '',
	description: 'Only return events after this timestamp. If empty, all captured events are returned.',
};

const networkTypeParameter: INodeProperties = {
	displayName: 'Type',
	name: 'type',
	type: 'options',
	default: '',
	// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
	options: [
		{ name: 'All', value: '' },
		{ name: 'Connection Accepted', value: 'connectionAccepted' },
		{ name: 'Connection Added', value: 'connectionAdded' },
		{ name: 'Connection Request Received', value: 'connectionRequestReceived' },
	],
	description: 'Filter events by type',
};

export class PollNetwork extends LinkedApiOperation {
	operationName = AVAILABLE_ACTION.pollNetwork;
	resource = 'other' as const;
	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(networkSinceParameter, this.show),
		createParameterWithDisplayOptions(networkTypeParameter, this.show),
	];
	url = (_: IExecuteFunctions): string => '/network/poll';
	method = 'POST' as const;
	qs = (_: IExecuteFunctions): Record<string, any> | undefined => {
		return undefined;
	};
	requestBody = (context: IExecuteFunctions): Record<string, any> | undefined => {
		const request: Record<string, any> = {};
		const since = this.stringParameter(context, 'since');
		const type = this.stringParameter(context, 'type');
		if (since) {
			request.since = since;
		}
		if (type) {
			request.type = type;
		}
		return request;
	};
}
