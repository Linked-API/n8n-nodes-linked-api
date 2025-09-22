import type { IExecuteFunctions } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	personHashedUrlParameter,
} from '../shared/SharedParameters';
import { SalesNavigatorLinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';

export class NvFetchPerson extends SalesNavigatorLinkedApiOperation {
	operationName = AVAILABLE_ACTION.nvFetchPerson;

	fields = [createParameterWithDisplayOptions(personHashedUrlParameter, this.show)];

	public body(context: IExecuteFunctions): Record<string, any> {
		return {
			personHashedUrl: this.stringParameter(context, 'personHashedUrl'),
		};
	}
}
