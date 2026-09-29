import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	postUrlParameter,
	postUrnParameter,
	postMentionsParameter,
	buildPostMentions,
	buildPostTarget,
	IPostMentionValue,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class CreateRepost extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.createRepost;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(postUrlParameter, this.show),
		createParameterWithDisplayOptions(postUrnParameter, this.show),
		{
			displayName: 'Commentary',
			name: 'repostText',
			type: 'string',
			typeOptions: {
				rows: 4,
			},
			default: '',
			displayOptions: { show: this.show },
			placeholder: 'Worth reading, especially the part on onboarding...',
			description:
				'Your own commentary, up to 3000 characters. Leave empty to repost the post as is.',
		},
		createParameterWithDisplayOptions(postMentionsParameter, this.show),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const text = this.stringParameter(context, 'repostText');
		const mentionsData = context.getNodeParameter('mentions', this.itemIndex, {}) as {
			mention?: IPostMentionValue[];
		};

		const body: Record<string, any> = {
			...buildPostTarget(
				this.stringParameter(context, 'postUrl'),
				this.stringParameter(context, 'postUrn'),
			),
		};

		if (text) {
			body.text = text;
		}

		const mentions = buildPostMentions(mentionsData);

		if (mentions) {
			body.mentions = mentions;
		}

		return body;
	}
}
