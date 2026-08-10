import type { IExecuteFunctions } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	personUrlParameter,
	syncDaysParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
export class SyncConversation extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.syncConversation;

	fields = [
		createParameterWithDisplayOptions(personUrlParameter, this.show),
		createParameterWithDisplayOptions(syncDaysParameter, this.show),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		return {
			personUrl: this.stringParameter(context, 'personUrl'),
			days: this.numberParameter(context, 'days'),
		};
	}
}
