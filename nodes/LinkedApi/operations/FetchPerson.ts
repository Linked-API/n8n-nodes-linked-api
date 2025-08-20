import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import LinkedApi, { TFetchPersonParams } from '../linkedapi-node';
import IOperation from '../utils/IOperation';

export class FetchPersonOperation extends IOperation<TFetchPersonParams> {
	override async buildParams(
		functions: IExecuteFunctions,
		itemIndex: number,
	): Promise<TFetchPersonParams> {
		const personUrl = functions.getNodeParameter('personUrl', itemIndex) as string;
		const retrieveExperience = functions.getNodeParameter('retrieveExperience', itemIndex) as
			| boolean
			| undefined;
		const retrieveEducation = functions.getNodeParameter('retrieveEducation', itemIndex) as
			| boolean
			| undefined;
		const retrieveSkills = functions.getNodeParameter('retrieveSkills', itemIndex) as
			| boolean
			| undefined;
		const retrieveLanguages = functions.getNodeParameter('retrieveLanguages', itemIndex) as
			| boolean
			| undefined;
		const retrievePosts = functions.getNodeParameter('retrievePosts', itemIndex) as
			| boolean
			| undefined;
		const retrieveComments = functions.getNodeParameter('retrieveComments', itemIndex) as
			| boolean
			| undefined;
		const retrieveReactions = functions.getNodeParameter('retrieveReactions', itemIndex) as
			| boolean
			| undefined;

		const fetchPersonParams: TFetchPersonParams = {
			personUrl,
		};

		if (retrieveExperience) {
			fetchPersonParams.retrieveExperience = true;
		}
		if (retrieveEducation) {
			fetchPersonParams.retrieveEducation = true;
		}
		if (retrieveSkills) {
			fetchPersonParams.retrieveSkills = true;
		}
		if (retrieveLanguages) {
			fetchPersonParams.retrieveLanguages = true;
		}
		if (retrievePosts) {
			const postsLimit = functions.getNodeParameter('postsLimit', itemIndex) as number | undefined;
			const postsSince = functions.getNodeParameter('postsSince', itemIndex) as string | undefined;
			fetchPersonParams.retrievePosts = true;
			const postsConfig: any = {};
			if (postsLimit) {
				postsConfig.limit = postsLimit;
			}
			if (postsSince) {
				postsConfig.since = new Date(postsSince).toISOString();
			}
			if (postsLimit || postsSince) {
				fetchPersonParams.postsRetrievalConfig = postsConfig;
			}
		}

		if (retrieveComments) {
			const commentsLimit = functions.getNodeParameter('commentsLimit', itemIndex) as
				| number
				| undefined;
			const commentsSince = functions.getNodeParameter('commentsSince', itemIndex) as
				| string
				| undefined;
			fetchPersonParams.retrieveComments = true;
			const commentsConfig: any = {};
			if (commentsLimit) {
				commentsConfig.limit = commentsLimit;
			}
			if (commentsSince) {
				commentsConfig.since = new Date(commentsSince).toISOString();
			}
			if (commentsLimit || commentsSince) {
				fetchPersonParams.commentsRetrievalConfig = commentsConfig;
			}
		}
		if (retrieveReactions) {
			const reactionsLimit = functions.getNodeParameter('reactionsLimit', itemIndex) as
				| number
				| undefined;
			const reactionsSince = functions.getNodeParameter('reactionsSince', itemIndex) as
				| string
				| undefined;
			fetchPersonParams.retrieveReactions = true;
			const reactionsConfig: any = {};
			if (reactionsLimit) {
				reactionsConfig.limit = reactionsLimit;
			}
			if (reactionsSince) {
				reactionsConfig.since = new Date(reactionsSince).toISOString();
			}
			if (reactionsLimit || reactionsSince) {
				fetchPersonParams.reactionsRetrievalConfig = reactionsConfig;
			}
		}

		return fetchPersonParams;
	}

	override async execute(linkedapi: LinkedApi, params: TFetchPersonParams): Promise<IDataObject> {
		const personWorkflow = await linkedapi.fetchPerson(params);
		const result = await personWorkflow.result();
		return { result };
	}
}

export const fetchPersonFields: INodeProperties[] = [
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
		displayName: 'Posts Limit',
		name: 'postsLimit',
		type: 'number',
		default: 20,
		typeOptions: {
			minValue: 1,
			maxValue: 20,
		},
		displayOptions: {
			show: {
				operation: ['fetchPerson'],
				retrievePosts: [true],
			},
		},
		description: 'Number of posts to retrieve (max 20)',
	},
	{
		displayName: 'Posts Since',
		name: 'postsSince',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				operation: ['fetchPerson'],
				retrievePosts: [true],
			},
		},
		description: 'Filter posts published after this date',
	},
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
		displayName: 'Comments Limit',
		name: 'commentsLimit',
		type: 'number',
		default: 20,
		typeOptions: {
			minValue: 1,
			maxValue: 20,
		},
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchPerson'],
				retrieveComments: [true],
			},
		},
		description: 'Number of comments to retrieve (max 20)',
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
		description: 'Filter comments made after this date',
	},
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
		displayName: 'Reactions Limit',
		name: 'reactionsLimit',
		type: 'number',
		default: 20,
		typeOptions: {
			minValue: 1,
			maxValue: 20,
		},
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchPerson'],
				retrieveReactions: [true],
			},
		},
		description: 'Number of reactions to retrieve (max 20)',
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
		description: 'Filter reactions made after this date',
	},
];
