import type { INodeProperties as TNodeProperties } from 'n8n-workflow';

const SIGNAL_TYPE_OPTIONS = [
	{ name: 'Company Posts', value: 'companyPosts' },
	{ name: 'List Alerts', value: 'listAlerts' },
	{ name: 'Network', value: 'network' },
	{ name: 'Person Posts', value: 'personPosts' },
	{ name: 'Post Engagement', value: 'postEngagement' },
	{ name: 'Post Search', value: 'postSearch' },
	{ name: 'Profile Viewers', value: 'profileViewers' },
];

function actorFilterParameter(name: string, displayName: string): TNodeProperties {
	return {
		displayName,
		name,
		type: 'fixedCollection',
		default: {},
		typeOptions: { multipleValues: true },
		placeholder: 'Add Entry',
		options: [
			{
				displayName: 'Entries',
				name: 'entries',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						required: true,
						default: '',
						description: 'Name shown by LinkedIn for this person or company',
					},
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
						description: 'Optional LinkedIn URL, URN, or company identifier to pin the match',
					},
				],
			},
		],
	};
}

export const SIGNAL_PARAMETERS = {
	type: {
		displayName: 'Signal Type',
		name: 'type',
		type: 'options',
		default: 'personPosts',
		options: SIGNAL_TYPE_OPTIONS,
		description: 'What the signal watches on your LinkedIn account',
	} satisfies TNodeProperties,
	id: {
		displayName: 'Signal ID',
		name: 'signalId',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'sigsub-example',
		description: 'Identifier returned when the signal was created',
	} satisfies TNodeProperties,
	status: {
		displayName: 'Status',
		name: 'status',
		type: 'options',
		default: '',
		options: [
			{ name: 'All', value: '' },
			{ name: 'Active', value: 'active' },
			{ name: 'Paused', value: 'paused' },
			{ name: 'Stopped', value: 'stopped' },
		],
		description: 'Filter signals by their current status',
	} satisfies TNodeProperties,
	eventType: {
		displayName: 'Event Type',
		name: 'eventType',
		type: 'options',
		default: '',
		options: [
			{ name: 'Alert Published', value: 'alertPublished' },
			{ name: 'All', value: '' },
			{ name: 'Comment Added', value: 'commentAdded' },
			{ name: 'Connection Accepted', value: 'connectionAccepted' },
			{ name: 'Connection Added', value: 'connectionAdded' },
			{ name: 'Connection Request Received', value: 'connectionRequestReceived' },
			{ name: 'Post Found', value: 'postFound' },
			{ name: 'Post Published', value: 'postPublished' },
			{ name: 'Profile Viewed', value: 'profileViewed' },
			{ name: 'Reaction Added', value: 'reactionAdded' },
		],
		description: 'Filter detected events by kind',
	} satisfies TNodeProperties,
	filter: {
		displayName: 'Filter',
		name: 'filter',
		type: 'collection',
		default: {},
		placeholder: 'Add Filter',
		description: 'Narrow the posts matched by the phrases',
		options: [
			{
				displayName: 'Content Type',
				name: 'contentType',
				type: 'options',
				default: '',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Documents', value: 'documents' },
					{ name: 'Images', value: 'images' },
					{ name: 'Job Posts', value: 'jobPosts' },
					{ name: 'Live Videos', value: 'liveVideos' },
					{ name: 'Videos', value: 'videos' },
				],
			},
			{
				displayName: 'Posted By',
				name: 'postedBy',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: '1st Connections', value: 'firstConnections' },
					{ name: 'Me', value: 'me' },
					{ name: 'People You Follow', value: 'peopleYouFollow' },
				],
			},
			actorFilterParameter('mentioningMembers', 'Mentioning Members'),
			actorFilterParameter('mentioningCompanies', 'Mentioning Companies'),
			actorFilterParameter('authorCompanies', 'Author Companies'),
			{
				displayName: 'Author Industries',
				name: 'authorIndustries',
				type: 'string',
				typeOptions: { multipleValues: true, multipleValueButtonText: 'Add Industry' },
				default: [],
				description: 'Industries the post author works in',
			},
		],
	} satisfies TNodeProperties,
};
