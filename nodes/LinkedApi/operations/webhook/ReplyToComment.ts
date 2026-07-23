import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	commentUrlParameter,
	replyTextParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class ReplyToComment extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.replyToComment;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(commentUrlParameter, this.show),
		createParameterWithDisplayOptions(replyTextParameter, this.show),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		return {
			commentUrl: this.stringParameter(context, 'commentUrl'),
			text: this.stringParameter(context, 'replyText'),
		};
	}
}
