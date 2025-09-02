import type { INodeProperties } from 'n8n-workflow';

export const fetchPersonFields: INodeProperties[] = [
	// Operation-level routing configuration (triggers the request)
	{
		displayName: '',
		name: 'fetchPersonOperation',
		type: 'hidden',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchPerson'],
			},
		},
		default: '',
		routing: {
			request: {
				body: {
					operationName: 'fetchPerson',
					webhookUrl: '={{$parameter["webhookUrl"]}}',
					data: {
						personUrl: '={{$parameter["personUrl"]}}',
						retrieveExperience: '={{$parameter["retrieveExperience"] || false}}',
						retrieveEducation: '={{$parameter["retrieveEducation"] || false}}',
						retrieveSkills: '={{$parameter["retrieveSkills"] || false}}',
						retrieveLanguages: '={{$parameter["retrieveLanguages"] || false}}',
						retrievePosts: '={{$parameter["retrievePosts"] || false}}',
						retrieveComments: '={{$parameter["retrieveComments"] || false}}',
						retrieveReactions: '={{$parameter["retrieveReactions"] || false}}',
						postsRetrievalConfig: '={{$parameter["retrievePosts"] ? {limit: $parameter["postsLimit"], since: $parameter["postsSince"] || undefined} : undefined}}',
						commentsRetrievalConfig: '={{$parameter["retrieveComments"] ? {limit: $parameter["commentsLimit"], since: $parameter["commentsSince"] || undefined} : undefined}}',
						reactionsRetrievalConfig: '={{$parameter["retrieveReactions"] ? {limit: $parameter["reactionsLimit"], since: $parameter["reactionsSince"] || undefined} : undefined}}',
					},
				},
			},
		},
	},
	// Parameter fields (no routing, just UI)
	{
		displayName: 'Person URL',
		name: 'personUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchPerson'],
			},
		},
		default: '',
		placeholder: 'https://www.linkedin.com/in/john-doe',
		description: 'The LinkedIn profile URL of the person to fetch',
	},
	{
		displayName: 'Retrieve Experience',
		name: 'retrieveExperience',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchPerson'],
			},
		},
		description: "Whether to retrieve the person's experience information",
	},
	{
		displayName: 'Retrieve Education',
		name: 'retrieveEducation',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchPerson'],
			},
		},
		description: "Whether to retrieve the person's education information",
	},
	{
		displayName: 'Retrieve Skills',
		name: 'retrieveSkills',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchPerson'],
			},
		},
		description: "Whether to retrieve the person's skills information",
	},
	{
		displayName: 'Retrieve Languages',
		name: 'retrieveLanguages',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchPerson'],
			},
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
			show: {
				resource: ['standard'],
				operation: ['fetchPerson'],
			},
		},
		description: "Whether to retrieve the person's posts information",
	},
	{
		displayName: 'Posts Since',
		name: 'postsSince',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchPerson'],
				retrievePosts: [true],
			},
		},
		description: "The date since the posts were created",
	},
	{
		displayName: 'Posts Limit',
		name: 'postsLimit',
		type: 'number',
		default: 10,
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchPerson'],
				retrievePosts: [true],
			},
		},
		description: "The number of posts to retrieve",
	},
	// Comments
	{
		displayName: 'Retrieve Comments',
		name: 'retrieveComments',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchPerson'],
			},
		},
		description: "Whether to retrieve the person's comments information",
	},
	{
		displayName: 'Comments Since',
		name: 'commentsSince',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchPerson'],
				retrieveComments: [true],
			},
		},
		description: "The date since the comments were created",
	},
	{
		displayName: 'Comments Limit',
		name: 'commentsLimit',
		type: 'number',
		default: 10,
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchPerson'],
				retrieveComments: [true],
			},
		},
		description: "The number of comments to retrieve",
	},
	// Reations
	{
		displayName: 'Retrieve Reactions',
		name: 'retrieveReactions',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchPerson'],
			},
		},
		description: "Whether to retrieve the person's reactions information",
	},
	{
		displayName: 'Reactions Since',
		name: 'reactionsSince',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchPerson'],
				retrieveReactions: [true],
			},
		},
		description: "The date since the reactions were created",
	},
	{
		displayName: 'Reactions Limit',
		name: 'reactionsLimit',
		type: 'number',
		default: 10,
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchPerson'],
				retrieveReactions: [true],
			},
		},
		description: "The number of reactions to retrieve",
	},
];
