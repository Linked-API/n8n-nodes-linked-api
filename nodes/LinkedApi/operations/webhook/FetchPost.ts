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
		{
			displayName: 'Additional Data to Retrieve',
			name: 'dataToRetrieve',
			type: 'multiOptions',
			default: [],
			displayOptions: { show: this.show },
			description: 'Select the additional data to include with the post details',
			options: [
				{ name: 'Comments', value: 'comments' },
				{ name: 'Reactions', value: 'reactions' },
			],
		},
		// Comments
		createParameterWithDisplayOptions(commentsLimitParameter, {
			...this.show,
			dataToRetrieve: ['comments'],
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
					dataToRetrieve: ['comments'],
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
					dataToRetrieve: ['comments'],
				},
			},
		},
		// Reactions
		createParameterWithDisplayOptions(reactionsLimitParameter, {
			...this.show,
			dataToRetrieve: ['reactions'],
		}),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const dataToRetrieve = context.getNodeParameter('dataToRetrieve', 0, []) as string[];
		const retrieveComments = dataToRetrieve.includes('comments');
		const retrieveReactions = dataToRetrieve.includes('reactions');

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
