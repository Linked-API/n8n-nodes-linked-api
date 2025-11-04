import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	personUrlParameter,
	postsLimitParameter,
	postsSinceParameter,
	commentsLimitParameter,
	commentsSinceParameter,
	reactionsLimitParameter,
	reactionsSinceParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class FetchPerson extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.fetchPerson;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(personUrlParameter, this.show),
		{
			displayName: 'Additional Data to Retrieve',
			name: 'dataToRetrieve',
			type: 'multiOptions',
			default: [],
			displayOptions: {
				show: this.show,
			},
			description: "Select the additional data to include with the person's profile",
			options: [
				{ name: 'Comments', value: 'comments' },
				{ name: 'Education', value: 'education' },
				{ name: 'Experience', value: 'experience' },
				{ name: 'Languages', value: 'languages' },
				{ name: 'Posts', value: 'posts' },
				{ name: 'Reactions', value: 'reactions' },
				{ name: 'Skills', value: 'skills' },
			],
		},
		// Posts
		createParameterWithDisplayOptions(postsSinceParameter, {
			...this.show,
			dataToRetrieve: ['posts'],
		}),
		createParameterWithDisplayOptions(postsLimitParameter, {
			...this.show,
			dataToRetrieve: ['posts'],
		}),
		// Comments
		createParameterWithDisplayOptions(commentsSinceParameter, {
			...this.show,
			dataToRetrieve: ['comments'],
		}),
		createParameterWithDisplayOptions(commentsLimitParameter, {
			...this.show,
			dataToRetrieve: ['comments'],
		}),
		// Reactions
		createParameterWithDisplayOptions(reactionsSinceParameter, {
			...this.show,
			dataToRetrieve: ['reactions'],
		}),
		createParameterWithDisplayOptions(reactionsLimitParameter, {
			...this.show,
			dataToRetrieve: ['reactions'],
		}),
	];
	public body(context: IExecuteFunctions): Record<string, any> {
		const dataToRetrieve = context.getNodeParameter('dataToRetrieve', 0, []) as string[];
		const retrieveExperience = dataToRetrieve.includes('experience');
		const retrieveEducation = dataToRetrieve.includes('education');
		const retrieveSkills = dataToRetrieve.includes('skills');
		const retrieveLanguages = dataToRetrieve.includes('languages');
		const retrievePosts = dataToRetrieve.includes('posts');
		const retrieveComments = dataToRetrieve.includes('comments');
		const retrieveReactions = dataToRetrieve.includes('reactions');

		const body = {
			personUrl: this.stringParameter(context, 'personUrl'),
			retrieveExperience,
			retrieveEducation,
			retrieveSkills,
			retrieveLanguages,
			retrievePosts,
			retrieveComments,
			retrieveReactions,
		};

		if (retrievePosts) {
			Object.assign(body, {
				postsRetrievalConfig: {
					limit: this.numberParameter(context, 'postsLimit'),
					since: this.stringParameter(context, 'postsSince') || undefined,
				},
			});
		}

		if (retrieveComments) {
			Object.assign(body, {
				commentsRetrievalConfig: {
					limit: this.numberParameter(context, 'commentsLimit'),
					since: this.stringParameter(context, 'commentsSince') || undefined,
				},
			});
		}

		if (retrieveReactions) {
			Object.assign(body, {
				reactionsRetrievalConfig: {
					limit: this.numberParameter(context, 'reactionsLimit'),
					since: this.stringParameter(context, 'reactionsSince') || undefined,
				},
			});
		}

		return body;
	}
}
