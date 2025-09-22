import type { IExecuteFunctions } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	personUrlParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class RemoveConnection extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.removeConnection;

	fields = [createParameterWithDisplayOptions(personUrlParameter, this.show)];

	public body(context: IExecuteFunctions): Record<string, any> {
		return {
			personUrl: this.stringParameter(context, 'personUrl'),
		};
	}
}
