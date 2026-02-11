import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	postUrlParameter,
	reactionTypeParameter,
	postCompanyUrlParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class ReactToPost extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.reactToPost;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(postUrlParameter, this.show),
		createParameterWithDisplayOptions(reactionTypeParameter, this.show),
		{
			displayName: 'Additional Parameters',
			name: 'additionalParameters',
			type: 'collection',
			placeholder: 'Add Field',
			default: {},
			displayOptions: {
				show: this.show,
			},
			options: [postCompanyUrlParameter],
		},
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const additionalParameters = context.getNodeParameter('additionalParameters', 0, {}) as {
			postCompanyUrl?: string;
		};

		const body: Record<string, any> = {
			postUrl: this.stringParameter(context, 'postUrl'),
			type: this.stringParameter(context, 'reactionType'),
		};

		if (additionalParameters.postCompanyUrl) {
			body.companyUrl = additionalParameters.postCompanyUrl;
		}

		return body;
	}
}
