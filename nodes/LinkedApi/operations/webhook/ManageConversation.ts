import type { IExecuteFunctions } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	conversationThreadIdParameter,
	manageConversationOperationParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class ManageConversation extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.manageConversation;

	fields = [
		createParameterWithDisplayOptions(conversationThreadIdParameter, this.show),
		createParameterWithDisplayOptions(manageConversationOperationParameter, this.show),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		return {
			threadId: this.stringParameter(context, 'threadId'),
			operation: this.stringParameter(context, 'conversationOperation'),
		};
	}
}
