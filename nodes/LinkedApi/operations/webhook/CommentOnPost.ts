import type { IExecuteFunctions } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	postUrlParameter,
	commentTextParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class CommentOnPost extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.commentOnPost;

	fields = [
		createParameterWithDisplayOptions(postUrlParameter, this.show),
		createParameterWithDisplayOptions(commentTextParameter, this.show),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		return {
			postUrl: this.stringParameter(context, 'postUrl'),
			text: this.stringParameter(context, 'commentText'),
		};
	}
}
