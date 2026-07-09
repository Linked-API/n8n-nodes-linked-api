import type { IExecuteFunctions } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	optionalPersonUrlParameter,
	messageTextParameter,
	threadIdParameter,
	sendMessageManageOperationParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class SendMessage extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.sendMessage;

	fields = [
		createParameterWithDisplayOptions(optionalPersonUrlParameter, this.show),
		createParameterWithDisplayOptions(threadIdParameter, this.show),
		createParameterWithDisplayOptions(messageTextParameter, this.show),
		createParameterWithDisplayOptions(sendMessageManageOperationParameter, this.show),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const body: Record<string, any> = {
			text: this.stringParameter(context, 'messageText'),
		};
		const threadId = this.stringParameter(context, 'threadId');
		const personUrl = this.stringParameter(context, 'personUrl');
		if (threadId) {
			body.threadId = threadId;
		} else if (personUrl) {
			body.personUrl = personUrl;
		}
		const manageOperation = this.stringParameter(context, 'manageConversationOperation');
		if (manageOperation) {
			body.manageConversation = { operation: manageOperation };
		}
		return body;
	}
}
