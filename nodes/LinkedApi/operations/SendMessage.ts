import type { IExecuteFunctions } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	personUrlParameter,
	messageTextParameter,
} from '../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';

export class SendMessage extends StandardLinkedApiOperation {
		operationName = AVAILABLE_ACTION.sendMessage;

	fields = [
		createParameterWithDisplayOptions(personUrlParameter, this.show),
		createParameterWithDisplayOptions(messageTextParameter, this.show),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		return {
			personUrl: this.stringParameter(context, 'personUrl'),
			text: this.stringParameter(context, 'messageText'),
		};
	}
}
