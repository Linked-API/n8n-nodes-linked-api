import type { IExecuteFunctions } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	personUrlParameter,
} from '../shared/SharedParameters';
import { SalesNavigatorLinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';

export class NvSyncConversation extends SalesNavigatorLinkedApiOperation {
	operationName = AVAILABLE_ACTION.nvSyncConversation;

	fields = [createParameterWithDisplayOptions(personUrlParameter, this.show)];

	public body(context: IExecuteFunctions): Record<string, any> {
		return {
			personUrl: this.stringParameter(context, 'personUrl'),
		};
	}
}
