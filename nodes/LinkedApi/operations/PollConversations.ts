import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { createParameterWithDisplayOptions } from '../shared/SharedParameters';
import { LinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';

const conversationsParameter: INodeProperties = {
	displayName: 'Conversations',
	name: 'conversations',
	type: 'json',
	required: true,
	default:
		'[\n  {\n    "personUrl": "https://www.linkedin.com/in/john-doe",\n    "type": "st",\n    "since": "2024-01-01T00:00:00Z"\n  }\n]',
	description: 'Array of conversation objects to poll',
	hint: 'Enter an array of conversation objects with personUrl, type (st/nv), and optional since timestamp',
};

export class PollConversations extends LinkedApiOperation {
	operationName = AVAILABLE_ACTION.pollConversations;
	resource = 'other' as const;
	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(conversationsParameter, this.show),
	];
	url = (_: IExecuteFunctions): string => '/conversations/poll';
	method = 'POST' as const;
	qs = (_: IExecuteFunctions): Record<string, any> | undefined => {
		return undefined;
	};
	requestBody = (context: IExecuteFunctions): Record<string, any> | undefined => {
		const conversationsJson = this.stringParameter(context, 'conversations');
		try {
			const conversations = JSON.parse(conversationsJson);
			// Validate that it's an array
			if (!Array.isArray(conversations)) {
				throw new Error('Conversations must be an array');
			}
			return conversations;
		} catch (error) {
			throw new Error(`Invalid JSON format for conversations: ${error.message}`);
		}
	};
}
