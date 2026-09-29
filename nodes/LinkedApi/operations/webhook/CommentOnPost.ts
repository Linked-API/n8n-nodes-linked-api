import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	postUrlParameter,
	postUrnParameter,
	buildPostTarget,
	commentTextParameter,
	postCompanyUrlParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class CommentOnPost extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.commentOnPost;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(postUrlParameter, this.show),
		createParameterWithDisplayOptions(commentTextParameter, this.show),
		{
			displayName: 'Additional Parameters',
			name: 'additionalParameters',
			type: 'collection',
			placeholder: 'Add Field',
			default: {},
			displayOptions: {
				show: this.show,
			},
			options: [postUrnParameter, postCompanyUrlParameter],
		},
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const additionalParameters = context.getNodeParameter('additionalParameters', this.itemIndex, {}) as {
			postUrn?: string;
			postCompanyUrl?: string;
		};

		const body: Record<string, any> = {
			...buildPostTarget(this.stringParameter(context, 'postUrl'), additionalParameters.postUrn),
			text: this.stringParameter(context, 'commentText'),
		};

		if (additionalParameters.postCompanyUrl) {
			body.companyUrl = additionalParameters.postCompanyUrl;
		}

		return body;
	}
}
