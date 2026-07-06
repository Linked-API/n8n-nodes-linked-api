import type { IExecuteFunctions } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	optionalPersonUrlParameter,
	messageTextParameter,
	messageSubjectParameter,
	threadIdParameter,
} from '../../shared/SharedParameters';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class NvSendMessage extends SalesNavigatorLinkedApiOperation {
	operationName = AVAILABLE_ACTION.nvSendMessage;

	fields = [
		createParameterWithDisplayOptions(optionalPersonUrlParameter, this.show),
		createParameterWithDisplayOptions(threadIdParameter, this.show),
		createParameterWithDisplayOptions(messageSubjectParameter, this.show),
		createParameterWithDisplayOptions(messageTextParameter, this.show),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const body: Record<string, any> = {
			text: this.stringParameter(context, 'messageText'),
		};
		const threadId = this.stringParameter(context, 'threadId');
		const personUrl = this.stringParameter(context, 'personUrl');
		const subject = this.stringParameter(context, 'messageSubject');
		if (threadId) {
			body.threadId = threadId;
		} else if (personUrl) {
			body.personUrl = personUrl;
		}
		if (subject) {
			body.subject = subject;
		}
		return body;
	}
}
