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
} from '../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';

export class FetchPerson extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.fetchPerson;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(personUrlParameter, this.show),
		{
			displayName: 'Retrieve Experience',
			name: 'retrieveExperience',
			type: 'boolean',
			default: false,
			displayOptions: {
				show: this.show,
			},
			description: "Whether to retrieve the person's experience information",
		},
		{
			displayName: 'Retrieve Education',
			name: 'retrieveEducation',
			type: 'boolean',
			default: false,
			displayOptions: {
				show: this.show,
			},
			description: "Whether to retrieve the person's education information",
		},
		{
			displayName: 'Retrieve Skills',
			name: 'retrieveSkills',
			type: 'boolean',
			default: false,
			displayOptions: {
				show: this.show,
			},
			description: "Whether to retrieve the person's skills information",
		},
		{
			displayName: 'Retrieve Languages',
			name: 'retrieveLanguages',
			type: 'boolean',
			default: false,
			displayOptions: {
				show: this.show,
			},
			description: "Whether to retrieve the person's languages information",
		},
		// Posts
		{
			displayName: 'Retrieve Posts',
			name: 'retrievePosts',
			type: 'boolean',
			default: false,
			displayOptions: {
				show: this.show,
			},
			description: "Whether to retrieve the person's posts information",
		},
		createParameterWithDisplayOptions(postsSinceParameter, {
			...this.show,
			retrievePosts: [true],
		}),
		createParameterWithDisplayOptions(postsLimitParameter, {
			...this.show,
			retrievePosts: [true],
		}),
		// Comments
		{
			displayName: 'Retrieve Comments',
			name: 'retrieveComments',
			type: 'boolean',
			default: false,
			displayOptions: {
				show: this.show,
			},
			description: "Whether to retrieve the person's comments information",
		},
		createParameterWithDisplayOptions(commentsSinceParameter, {
			...this.show,
			retrieveComments: [true],
		}),
		createParameterWithDisplayOptions(commentsLimitParameter, {
			...this.show,
			retrieveComments: [true],
		}),
		// Reations
		{
			displayName: 'Retrieve Reactions',
			name: 'retrieveReactions',
			type: 'boolean',
			default: false,
			displayOptions: {
				show: this.show,
			},
			description: "Whether to retrieve the person's reactions information",
		},
		createParameterWithDisplayOptions(reactionsSinceParameter, {
			...this.show,
			retrieveReactions: [true],
		}),
		createParameterWithDisplayOptions(reactionsLimitParameter, {
			...this.show,
			retrieveReactions: [true],
		}),
	];
	public body(context: IExecuteFunctions): Record<string, any> {
		const retrievePosts = this.booleanParameter(context, 'retrievePosts');
		const retrieveComments = this.booleanParameter(context, 'retrieveComments');
		const retrieveReactions = this.booleanParameter(context, 'retrieveReactions');

		const body = {
			personUrl: this.stringParameter(context, 'personUrl'),
			retrieveExperience: this.booleanParameter(context, 'retrieveExperience'),
			retrieveEducation: this.booleanParameter(context, 'retrieveEducation'),
			retrieveSkills: this.booleanParameter(context, 'retrieveSkills'),
			retrieveLanguages: this.booleanParameter(context, 'retrieveLanguages'),
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
