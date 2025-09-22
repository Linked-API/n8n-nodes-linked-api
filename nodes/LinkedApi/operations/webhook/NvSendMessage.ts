import type { IExecuteFunctions } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	personUrlParameter,
	messageTextParameter,
	messageSubjectParameter,
} from '../../shared/SharedParameters';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class NvSendMessage extends SalesNavigatorLinkedApiOperation {
	operationName = AVAILABLE_ACTION.nvSendMessage;

	fields = [
		createParameterWithDisplayOptions(personUrlParameter, this.show),
		createParameterWithDisplayOptions(messageSubjectParameter, this.show),
		createParameterWithDisplayOptions(messageTextParameter, this.show),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		return {
			personUrl: this.stringParameter(context, 'personUrl'),
			text: this.stringParameter(context, 'messageText'),
			subject: this.stringParameter(context, 'messageSubject'),
		};
	}
}
