import type { IExecuteFunctions } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	conversationThreadIdParameter,
	nvManageConversationOperationParameter,
} from '../../shared/SharedParameters';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class NvManageConversation extends SalesNavigatorLinkedApiOperation {
	operationName = AVAILABLE_ACTION.nvManageConversation;

	fields = [
		createParameterWithDisplayOptions(conversationThreadIdParameter, this.show),
		createParameterWithDisplayOptions(nvManageConversationOperationParameter, this.show),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		return {
			threadId: this.stringParameter(context, 'threadId'),
			operation: this.stringParameter(context, 'conversationOperation'),
		};
	}
}
