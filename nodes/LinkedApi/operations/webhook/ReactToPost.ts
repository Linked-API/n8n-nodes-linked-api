import type { IExecuteFunctions } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	postUrlParameter,
	reactionTypeParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class ReactToPost extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.reactToPost;

	fields = [
		createParameterWithDisplayOptions(postUrlParameter, this.show),
		createParameterWithDisplayOptions(reactionTypeParameter, this.show),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		return {
			postUrl: this.stringParameter(context, 'postUrl'),
			type: this.stringParameter(context, 'reactionType'),
		};
	}
}
