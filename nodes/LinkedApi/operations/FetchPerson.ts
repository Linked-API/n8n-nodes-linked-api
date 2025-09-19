import type { INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	createRequestOperation,
	personUrlParameter,
	postsLimitParameter,
	postsSinceParameter,
	commentsLimitParameter,
	commentsSinceParameter,
	reactionsLimitParameter,
	reactionsSinceParameter,
} from '../shared/SharedParameters';

const show = {
	resource: ['standard'],
	operation: ['fetchPerson'],
};

export const fetchPersonFields: INodeProperties[] = [
	createRequestOperation(
		'fetchPerson',
		{
			personUrl: '={{$parameter["personUrl"]}}',
			retrieveExperience: '={{$parameter["retrieveExperience"] || false}}',
			retrieveEducation: '={{$parameter["retrieveEducation"] || false}}',
			retrieveSkills: '={{$parameter["retrieveSkills"] || false}}',
			retrieveLanguages: '={{$parameter["retrieveLanguages"] || false}}',
			retrievePosts: '={{$parameter["retrievePosts"] || false}}',
			retrieveComments: '={{$parameter["retrieveComments"] || false}}',
			retrieveReactions: '={{$parameter["retrieveReactions"] || false}}',
			postsRetrievalConfig:
				'={{$parameter["retrievePosts"] ? {limit: $parameter["postsLimit"], since: $parameter["postsSince"] || undefined} : undefined}}',
			commentsRetrievalConfig:
				'={{$parameter["retrieveComments"] ? {limit: $parameter["commentsLimit"], since: $parameter["commentsSince"] || undefined} : undefined}}',
			reactionsRetrievalConfig:
				'={{$parameter["retrieveReactions"] ? {limit: $parameter["reactionsLimit"], since: $parameter["reactionsSince"] || undefined} : undefined}}',
		},
		show,
	),
	createParameterWithDisplayOptions(personUrlParameter, show),
	{
		displayName: 'Retrieve Experience',
		name: 'retrieveExperience',
		type: 'boolean',
		default: false,
		displayOptions: {
			show,
		},
		description: "Whether to retrieve the person's experience information",
	},
	{
		displayName: 'Retrieve Education',
		name: 'retrieveEducation',
		type: 'boolean',
		default: false,
		displayOptions: {
			show,
		},
		description: "Whether to retrieve the person's education information",
	},
	{
		displayName: 'Retrieve Skills',
		name: 'retrieveSkills',
		type: 'boolean',
		default: false,
		displayOptions: {
			show,
		},
		description: "Whether to retrieve the person's skills information",
	},
	{
		displayName: 'Retrieve Languages',
		name: 'retrieveLanguages',
		type: 'boolean',
		default: false,
		displayOptions: {
			show,
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
			show,
		},
		description: "Whether to retrieve the person's posts information",
	},
	createParameterWithDisplayOptions(postsSinceParameter, {
		...show,
		retrievePosts: [true],
	}),
	createParameterWithDisplayOptions(postsLimitParameter, {
		...show,
		retrievePosts: [true],
	}),
	// Comments
	{
		displayName: 'Retrieve Comments',
		name: 'retrieveComments',
		type: 'boolean',
		default: false,
		displayOptions: {
			show,
		},
		description: "Whether to retrieve the person's comments information",
	},
	createParameterWithDisplayOptions(commentsSinceParameter, {
		...show,
		retrieveComments: [true],
	}),
	createParameterWithDisplayOptions(commentsLimitParameter, {
		...show,
		retrieveComments: [true],
	}),
	// Reations
	{
		displayName: 'Retrieve Reactions',
		name: 'retrieveReactions',
		type: 'boolean',
		default: false,
		displayOptions: {
			show,
		},
		description: "Whether to retrieve the person's reactions information",
	},
	createParameterWithDisplayOptions(reactionsSinceParameter, {
		...show,
		retrieveReactions: [true],
	}),
	createParameterWithDisplayOptions(reactionsLimitParameter, {
		...show,
		retrieveReactions: [true],
	}),
];
