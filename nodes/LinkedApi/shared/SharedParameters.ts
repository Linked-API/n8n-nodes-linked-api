/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import type { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import {
	availableSalesNavigatorOperations,
	availableStandardOperations,
} from './AvailableOperations';

/**
 * Shared parameter definitions that can be reused across operations
 * Each parameter can be customized by overriding specific properties like displayOptions
 */

// URL Parameters
export const personUrlParameter: INodeProperties = {
	displayName: 'Person URL',
	name: 'personUrl',
	type: 'string',
	required: true,
	default: '',
	placeholder: 'https://www.linkedin.com/in/john-doe',
	description: 'Public or hashed LinkedIn URL of the person',
};

export const companyUrlParameter: INodeProperties = {
	displayName: 'Company URL',
	name: 'companyUrl',
	type: 'string',
	required: true,
	default: '',
	placeholder: 'https://www.linkedin.com/company/microsoft',
	description: 'The LinkedIn company page URL to fetch',
};

export const personHashedUrlParameter: INodeProperties = {
	displayName: 'Person Hashed URL',
	name: 'personHashedUrl',
	type: 'string',
	required: true,
	default: '',
	placeholder: 'https://www.linkedin.com/in/SInQBmjJ015eLr8',
	description: 'Hashed LinkedIn URL of the person',
};

export const companyHashedUrlParameter: INodeProperties = {
	displayName: 'Company Hashed URL',
	name: 'companyHashedUrl',
	type: 'string',
	required: true,
	default: '',
	placeholder: 'https://www.linkedin.com/company/12345678',
	description: 'Hashed LinkedIn URL of the company',
};

// Search Parameters
export const searchTermParameter: INodeProperties = {
	displayName: 'Search Term',
	name: 'searchTerm',
	type: 'string',
	default: '',
	placeholder: 'software development',
	description: 'Search term/keywords for company name or description',
};

// Limit Parameters
export const limitParameter: INodeProperties = {
	displayName: 'Limit',
	name: 'limit',
	type: 'number',
	typeOptions: {
		minValue: 1,
	},
	default: 10,
	description: 'Max number of results to return',
};

export const employeeLimitParameter: INodeProperties = {
	displayName: 'Employees Limit',
	name: 'employeeLimit',
	type: 'number',
	default: 500,
	description: 'The number of employees to retrieve',
};

export const postsLimitParameter: INodeProperties = {
	displayName: 'Posts Limit',
	name: 'postsLimit',
	type: 'number',
	default: 20,
	description: 'The number of posts to retrieve',
};

export const commentsLimitParameter: INodeProperties = {
	displayName: 'Comments Limit',
	name: 'commentsLimit',
	type: 'number',
	default: 10,
	description: 'The number of comments to retrieve',
};

export const reactionsLimitParameter: INodeProperties = {
	displayName: 'Reactions Limit',
	name: 'reactionsLimit',
	type: 'number',
	default: 10,
	description: 'The number of reactions to retrieve',
};

export const dmsLimitParameter: INodeProperties = {
	displayName: 'Decision Makers Limit',
	name: 'dmsLimit',
	type: 'number',
	default: 20,
	description: 'The number of decision makers to retrieve',
};

// Date/Time Parameters
export const postsSinceParameter: INodeProperties = {
	displayName: 'Posts Since',
	name: 'postsSince',
	type: 'dateTime',
	default: '',
	description: 'The date since the posts were created',
};

export const commentsSinceParameter: INodeProperties = {
	displayName: 'Comments Since',
	name: 'commentsSince',
	type: 'dateTime',
	default: '',
	description: 'The date since the comments were created',
};

export const reactionsSinceParameter: INodeProperties = {
	displayName: 'Reactions Since',
	name: 'reactionsSince',
	type: 'dateTime',
	default: '',
	description: 'The date since the reactions were created',
};

// Message Parameters
export const messageTextParameter: INodeProperties = {
	displayName: 'Message Text',
	name: 'messageText',
	type: 'string',
	typeOptions: {
		rows: 4,
	},
	required: true,
	default: '',
	placeholder: 'Hi! How are you?',
	description: 'Message text, must be up to 1900 characters',
};

export const messageSubjectParameter: INodeProperties = {
	displayName: 'Subject',
	name: 'messageSubject',
	type: 'string',
	required: true,
	default: '',
	placeholder: "Let's Connect!",
	description: 'Subject line, must be up to 80 characters',
};

// Connection Management Parameters
export const connectionNoteParameter: INodeProperties = {
	displayName: 'Connection Note',
	name: 'connectionNote',
	type: 'string',
	default: '',
	placeholder: "Hello! I'd love to connect and discuss opportunities.",
	description: 'Optional note to include with the connection request',
};

export const emailParameter: INodeProperties = {
	displayName: 'Email Address',
	name: 'email',
	type: 'string',
	default: '',
	placeholder: 'john.doe@example.com',
	description: 'Email address required by some people for sending connection requests',
};

export const unfollowParameter: INodeProperties = {
	displayName: 'Unfollow',
	name: 'unfollow',
	type: 'boolean',
	default: true,
	description: 'Whether to unfollow the person when withdrawing the request',
};

// Post Interaction Parameters
export const postUrlParameter: INodeProperties = {
	displayName: 'Post URL',
	name: 'postUrl',
	type: 'string',
	default: '',
	placeholder: 'https://www.linkedin.com/posts/username_activity',
	description: 'LinkedIn URL of the post',
};

export const commentTextParameter: INodeProperties = {
	displayName: 'Comment Text',
	name: 'commentText',
	type: 'string',
	default: '',
	placeholder: 'Great insights! I completely agree with your perspective.',
	description: 'Comment text, must be up to 1000 characters',
};

export const reactionTypeParameter: INodeProperties = {
	displayName: 'Reaction Type',
	name: 'reactionType',
	type: 'options',
	default: 'like',
	description: 'Type of reaction to add to the post',
	options: [
		{
			name: 'Like',
			value: 'like',
			description: 'Standard "like"',
		},
		{
			name: 'Celebrate',
			value: 'celebrate',
			description: 'To celebrate an achievement',
		},
		{
			name: 'Support',
			value: 'support',
			description: 'To show support',
		},
		{
			name: 'Love',
			value: 'love',
			description: 'To express love or admiration',
		},
		{
			name: 'Insightful',
			value: 'insightful',
			description: 'To appreciate insightful content',
		},
		{
			name: 'Funny',
			value: 'funny',
			description: 'To react to something humorous',
		},
	],
};

// Custom Workflow Parameters
export const workflowDefinitionParameter: INodeProperties = {
	displayName: 'Workflow Definition',
	name: 'workflowDefinition',
	type: 'json',
	default: '{\n  "actionType": "st.searchCompanies",\n  "term": "AI startup",\n  "limit": 10\n}',
	description: 'Raw workflow definition object for complex multi-step operations',
	hint: 'Enter a JSON workflow definition following the LinkedAPI workflow format',
};

export const workflowIdParameter: INodeProperties = {
	displayName: 'Workflow ID',
	name: 'workflowId',
	type: 'string',
	default: '',
	description: 'ID of the workflow to retrieve the result from',
};

export const workflowOperationParameter: INodeProperties = {
	displayName: 'Workflow Operation',
	name: 'workflowOperation',
	type: 'options',
	default: '',
	options: [...availableStandardOperations.options!, ...availableSalesNavigatorOperations.options!],
	description: 'Worfklow operation used during the execution of the workflow',
};

// Request Operation Parameters
/**
 * Creates a shared request operation parameter that handles the routing configuration
 * This eliminates the need to duplicate the common request structure across all operations.
 *
 * @param operationName The name of the operation (e.g., 'sendMessage', 'fetchPerson')
 * @param dataMapping Object mapping parameter names to their values in the request data (can be nested)
 * @param show The show object for displayOptions
 *
 * @example
 * // Simple operation with basic data mapping
 * createRequestOperation(
 *   'sendMessage',
 *   {
 *     personUrl: '={{$parameter["personUrl"]}}',
 *     text: '={{$parameter["messageText"]}}',
 *   },
 *   {
 *     resource: ['standard'],
 *     operation: ['sendMessage'],
 *   }
 * )
 *
 * @example
 * // Complex operation with nested filter objects
 * createRequestOperation(
 *   'searchCompanies',
 *   {
 *     term: '={{$parameter["searchTerm"] || undefined}}',
 *     limit: '={{$parameter["limit"]}}',
 *     filter: {
 *       locations: '={{$parameter["additionalSearchFields"]?.locations ? $parameter["additionalSearchFields"].locations.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
 *       industries: '={{$parameter["additionalSearchFields"]?.industries ? $parameter["additionalSearchFields"].industries.split(";").map(s => s.trim()).filter(s => s) : undefined}}',
 *       sizes: '={{$parameter["additionalSearchFields"]?.sizes || undefined}}',
 *     },
 *   },
 *   {
 *     resource: ['standard'],
 *     operation: ['searchCompanies'],
 *   }
 * )
 */
export function createRequestOperation(
	operationName: string,
	dataMapping: Record<string, any>,
	show: IDisplayOptions['show'],
): INodeProperties {
	return {
		displayName: '',
		name: `${operationName}Operation`,
		type: 'hidden',
		displayOptions: {
			show,
		},
		default: '',
		routing: {
			request: {
				body: {
					operationName,
					webhookUrl: '={{$parameter["webhookUrl"]}}',
					data: dataMapping,
				},
			},
		},
	};
}

/**
 * Helper function to create a parameter with custom displayOptions
 * @param baseParameter The base parameter to clone
 * @param show The show object for displayOptions (e.g., { resource: ['standard'], operation: ['fetchPerson'] })
 */
export function createParameterWithDisplayOptions(
	baseParameter: INodeProperties,
	show: IDisplayOptions['show'],
): INodeProperties {
	return {
		...baseParameter,
		displayOptions: {
			show,
		},
	};
}
