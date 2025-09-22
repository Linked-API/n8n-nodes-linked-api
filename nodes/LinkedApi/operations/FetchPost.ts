import type { IExecuteFunctions } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	postUrlParameter,
} from '../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';

export class FetchPost extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.fetchPost;

	fields = [createParameterWithDisplayOptions(postUrlParameter, this.show)];

	public body(context: IExecuteFunctions): Record<string, any> {
		return {
			postUrl: this.stringParameter(context, 'postUrl'),
		};
	}
}
