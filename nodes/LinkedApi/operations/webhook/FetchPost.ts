import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	postUrlParameter,
	commentsLimitParameter,
	reactionsLimitParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class FetchPost extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.fetchPost;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(postUrlParameter, this.show),
		// Comments
		{
			displayName: 'Retrieve Comments',
			name: 'retrieveComments',
			type: 'boolean',
			default: false,
			description: 'Whether to include post comments in the result',
			displayOptions: { show: this.show },
		},
		createParameterWithDisplayOptions(commentsLimitParameter, {
			...this.show,
			retrieveComments: [true],
		}),
		{
			displayName: 'Include Replies',
			name: 'commentsReplies',
			type: 'boolean',
			default: false,
			description: 'Whether to include replies to comments',
			displayOptions: {
				show: {
					...this.show,
					retrieveComments: [true],
				},
			},
		},
		{
			displayName: 'Comments Sort',
			name: 'commentsSort',
			type: 'options',
			default: 'mostRelevant',
			description: 'Sorting order for comments',
			options: [
				{ name: 'Most Relevant', value: 'mostRelevant' },
				{ name: 'Most Recent', value: 'mostRecent' },
			],
			displayOptions: {
				show: {
					...this.show,
					retrieveComments: [true],
				},
			},
		},
		// Reactions
		{
			displayName: 'Retrieve Reactions',
			name: 'retrieveReactions',
			type: 'boolean',
			default: false,
			description: 'Whether to include post reactions/likes in the result',
			displayOptions: { show: this.show },
		},
		createParameterWithDisplayOptions(reactionsLimitParameter, {
			...this.show,
			retrieveReactions: [true],
		}),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const retrieveComments = this.booleanParameter(context, 'retrieveComments');
		const retrieveReactions = this.booleanParameter(context, 'retrieveReactions');

		const body: Record<string, any> = {
			postUrl: this.stringParameter(context, 'postUrl'),
			retrieveComments,
			retrieveReactions,
		};

		if (retrieveComments) {
			body.commentsRetrievalConfig = {
				limit: this.numberParameter(context, 'commentsLimit'),
				replies: this.booleanParameter(context, 'commentsReplies'),
				sort: this.stringParameter(context, 'commentsSort'),
			};
		}

		if (retrieveReactions) {
			body.reactionsRetrievalConfig = {
				limit: this.numberParameter(context, 'reactionsLimit'),
			};
		}

		return body;
	}
}
