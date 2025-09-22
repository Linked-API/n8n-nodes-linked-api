import type { IExecuteFunctions } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	personUrlParameter,
	connectionNoteParameter,
	emailParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class SendConnectionRequest extends StandardLinkedApiOperation {
		operationName = AVAILABLE_ACTION.sendConnectionRequest;

	fields = [
		createParameterWithDisplayOptions(personUrlParameter, this.show),
		createParameterWithDisplayOptions(connectionNoteParameter, this.show),
		createParameterWithDisplayOptions(emailParameter, this.show),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		return {
			personUrl: this.stringParameter(context, 'personUrl'),
			note: this.stringParameter(context, 'connectionNote') || undefined,
			email: this.stringParameter(context, 'email') || undefined,
		};
	}
}
