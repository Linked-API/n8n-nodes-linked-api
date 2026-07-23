import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	commentUrlParameter,
	reactionTypeParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class ReactToComment extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.reactToComment;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(commentUrlParameter, this.show),
		createParameterWithDisplayOptions(reactionTypeParameter, this.show),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		return {
			commentUrl: this.stringParameter(context, 'commentUrl'),
			type: this.stringParameter(context, 'reactionType'),
		};
	}
}
