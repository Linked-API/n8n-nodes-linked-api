/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
import type { IDisplayOptions, INodeProperties } from 'n8n-workflow';
import {
	availableSalesNavigatorOperations,
	availableStandardOperations,
	customWorkflowOption,
} from './AvailableActions';

/**
 * Shared parameter definitions that can be reused across actions
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
	displayName: 'Search Term (Optional)',
	name: 'searchTerm',
	type: 'string',
	default: '',
	placeholder: 'software development',
	description: 'Search term/keywords for company name or description',
};

export const customSearchUrlParameter: INodeProperties = {
	displayName: 'Custom Search URL',
	name: 'customSearchUrl',
	type: 'string',
	default: '',
	placeholder: 'https://www.linkedin.com/sales/search/people?...',
	description:
		'URL copied from the search results page (LinkedIn or Sales Navigator). When specified, overrides term and filter parameters.',
};

// Common Filter Parameters
export const firstNameParameter: INodeProperties = {
	displayName: 'First Name',
	name: 'firstName',
	type: 'string',
	default: '',
	placeholder: 'John',
	description: 'First name of person',
};

export const lastNameParameter: INodeProperties = {
	displayName: 'Last Name',
	name: 'lastName',
	type: 'string',
	default: '',
	placeholder: 'Doe',
	description: 'Last name of person',
};

export const positionParameter: INodeProperties = {
	displayName: 'Position',
	name: 'position',
	type: 'string',
	default: '',
	placeholder: 'Manager',
	description: 'Job position of person',
};

export const locationsParameter: INodeProperties = {
	displayName: 'Locations',
	name: 'locations',
	type: 'string',
	default: '',
	placeholder: 'New York; San Francisco; London',
	description: 'Locations separated by semicolons',
};

export const industriesParameter: INodeProperties = {
	displayName: 'Industries',
	name: 'industries',
	type: 'string',
	default: '',
	placeholder: 'Software Development; Technology',
	description: 'Industries separated by semicolons',
};

export const currentCompaniesParameter: INodeProperties = {
	displayName: 'Current Companies',
	name: 'currentCompanies',
	type: 'string',
	default: '',
	placeholder: 'Google; Microsoft',
	description: 'Current companies separated by semicolons',
};

export const previousCompaniesParameter: INodeProperties = {
	displayName: 'Previous Companies',
	name: 'previousCompanies',
	type: 'string',
	default: '',
	placeholder: 'Apple; Facebook',
	description: 'Previous companies separated by semicolons',
};

export const schoolsParameter: INodeProperties = {
	displayName: 'Schools',
	name: 'schools',
	type: 'string',
	default: '',
	placeholder: 'Stanford University; MIT',
	description: 'Schools separated by semicolons',
};

export const companySizesParameter: INodeProperties = {
	displayName: 'Company Sizes',
	name: 'sizes',
	type: 'multiOptions',
	default: [],
	// eslint-disable-next-line n8n-nodes-base/node-param-multi-options-type-unsorted-items
	options: [
		{ name: '1-10', value: '1-10' },
		{ name: '11-50', value: '11-50' },
		{ name: '51-200', value: '51-200' },
		{ name: '201-500', value: '201-500' },
		{ name: '501-1000', value: '501-1000' },
		{ name: '1001-5000', value: '1001-5000' },
		{ name: '5001-10000', value: '5001-10000' },
		{ name: '10001+', value: '10001+' },
	],
	description: 'Filter by company size (employee count)',
};

export const yearsOfExperienceParameter: INodeProperties = {
	displayName: 'Years of Experience',
	name: 'yearsOfExperiences',
	type: 'multiOptions',
	default: [],
	description: 'Professional experience ranges',
	// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
	options: [
		{
			name: '1 To 2 Years',
			value: 'oneToTwo',
		},
		{
			name: '3 To 5 Years',
			value: 'threeToFive',
		},
		{
			name: '6 To 10 Years',
			value: 'sixToTen',
		},
		{
			name: 'Less Than 1 Year',
			value: 'lessThanOne',
		},
		{
			name: 'More Than 10 Years',
			value: 'moreThanTen',
		},
	],
};

export const annualRevenueMinParameter: INodeProperties = {
	displayName: 'Annual Revenue Min',
	name: 'annualRevenueMin',
	type: 'options',
	default: '',
	options: [
		{ name: 'Not Set', value: '' },
		{ name: '0', value: '0' },
		{ name: '0.5', value: '0.5' },
		{ name: '1', value: '1' },
		{ name: '2.5', value: '2.5' },
		{ name: '5', value: '5' },
		{ name: '10', value: '10' },
		{ name: '20', value: '20' },
		{ name: '50', value: '50' },
		{ name: '100', value: '100' },
		{ name: '500', value: '500' },
		{ name: '1000', value: '1000' },
	],
	description: 'Minimum annual revenue in million USD',
};

export const annualRevenueMaxParameter: INodeProperties = {
	displayName: 'Annual Revenue Max',
	name: 'annualRevenueMax',
	type: 'options',
	default: '',
	options: [
		{ name: 'Not Set', value: '' },
		{ name: '0.5', value: '0.5' },
		{ name: '1', value: '1' },
		{ name: '2.5', value: '2.5' },
		{ name: '5', value: '5' },
		{ name: '10', value: '10' },
		{ name: '20', value: '20' },
		{ name: '50', value: '50' },
		{ name: '100', value: '100' },
		{ name: '500', value: '500' },
		{ name: '1000', value: '1000' },
		{ name: '1000+', value: '1000+' },
	],
	description: 'Maximum annual revenue in million USD',
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

export const sinceParameter: INodeProperties = {
	displayName: 'Since',
	name: 'since',
	type: 'dateTime',
	default: '',
	description: 'Only return connections made on or after this date. Only works when no filter fields are provided.',
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

// Create Post Parameters
export const postTextParameter: INodeProperties = {
	displayName: 'Post Text',
	name: 'postText',
	type: 'string',
	typeOptions: {
		rows: 4,
	},
	required: true,
	default: '',
	placeholder: 'Share your thoughts...',
	description: 'Post content, must be up to 3000 characters',
};

export const postCompanyUrlParameter: INodeProperties = {
	displayName: 'Company URL',
	name: 'postCompanyUrl',
	type: 'string',
	default: '',
	placeholder: 'https://www.linkedin.com/company/acme-corp',
	description: 'LinkedIn company page URL. If specified, the action will be performed on behalf of the company page.',
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
	placeholder: 'wf-fff00000-9999-4343-bbaa-1234567890ab',
	description: 'ID of the workflow',
};

export const workflowOperationParameter: INodeProperties = {
	displayName: 'Workflow Operation',
	name: 'workflowOperation',
	type: 'options',
	default: '',
	options: [
		customWorkflowOption,
		...availableStandardOperations.options!,
		...availableSalesNavigatorOperations.options!,
	],
	description: 'Worfklow operation used during the execution of the workflow',
};

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
