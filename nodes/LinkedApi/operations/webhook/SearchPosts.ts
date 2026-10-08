/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-multi-options-type-unsorted-items */
import { IExecuteFunctions, INodeProperties, NodeOperationError } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	searchTermParameter,
	limitParameter,
	customSearchUrlParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class SearchPosts extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.searchPosts;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(
			{
				...searchTermParameter,
				placeholder: 'climate tech',
				description:
					'Keyword or phrase to search, from 1 to 50 characters. Either this or Custom Search URL must be provided.',
			},
			this.show,
		),
		createParameterWithDisplayOptions(limitParameter, this.show),
		{
			displayName: 'Advanced Filter',
			name: 'advancedFilter',
			type: 'collection',
			placeholder: 'Add Field',
			default: {},
			description:
				'Filtering criteria for posts. Every specified field is applied, or the action fails. Ignored entirely when Custom Search URL is specified.',
			displayOptions: {
				show: this.show,
			},
			options: [
				{
					...customSearchUrlParameter,
					placeholder: 'https://www.linkedin.com/search/results/content/?keywords=climate%20tech',
					description:
						'URL copied from a LinkedIn content search page after configuring desired filters. When specified, the other filter fields are ignored entirely.',
				},
				{
					displayName: 'Sort By',
					name: 'sort',
					type: 'options',
					default: '',
					description: 'How LinkedIn orders the results',
					options: [
						{ name: 'Not Set', value: '' },
						{ name: 'Top Match', value: 'topMatch' },
						{ name: 'Latest', value: 'latest' },
					],
				},
				{
					displayName: 'Date Posted',
					name: 'datePosted',
					type: 'options',
					default: '',
					description: 'Filter by when the post was published',
					options: [
						{ name: 'Not Set', value: '' },
						{ name: 'Past 24 Hours', value: 'past24Hours' },
						{ name: 'Past Week', value: 'pastWeek' },
						{ name: 'Past Month', value: 'pastMonth' },
					],
				},
				{
					displayName: 'Content Type',
					name: 'contentType',
					type: 'options',
					default: '',
					description: 'Filter by the kind of content the post carries',
					options: [
						{ name: 'Not Set', value: '' },
						{ name: 'Videos', value: 'videos' },
						{ name: 'Images', value: 'images' },
						{ name: 'Job Posts', value: 'jobPosts' },
						{ name: 'Live Videos', value: 'liveVideos' },
						{ name: 'Documents', value: 'documents' },
					],
				},
				{
					displayName: 'Posted By',
					name: 'postedBy',
					type: 'multiOptions',
					default: [],
					description: 'Filter by who published the post',
					options: [
						{ name: 'Me', value: 'me' },
						{ name: '1st Connections', value: 'firstConnections' },
						{ name: 'People You Follow', value: 'peopleYouFollow' },
					],
				},
				{
					displayName: 'From Members',
					name: 'fromMembers',
					type: 'string',
					default: '',
					placeholder: 'Bill Gates; Example Person:urn:li:member:123456789',
					description:
						'People whose posts to keep, separated by semicolons. Each is a name, or Name:identifier with a member URN or profile URL.',
				},
				{
					displayName: 'From Companies',
					name: 'fromCompanies',
					type: 'string',
					default: '',
					placeholder: 'Microsoft; Example Company:urn:li:organization:1234567',
					description:
						'Companies whose posts to keep, separated by semicolons. Each is a name, or Name:identifier with an organization URN or company URL.',
				},
				{
					displayName: 'Mentioning Members',
					name: 'mentioningMembers',
					type: 'string',
					default: '',
					placeholder: 'Bill Gates; Example Person:urn:li:member:123456789',
					description:
						'People to look for in post text, separated by semicolons. Each is a name, or Name:identifier with a member URN or profile URL.',
				},
				{
					displayName: 'Mentioning Companies',
					name: 'mentioningCompanies',
					type: 'string',
					default: '',
					placeholder: 'Microsoft; Example Company:urn:li:organization:1234567',
					description:
						'Companies to look for in post text, separated by semicolons. Each is a name, or Name:identifier with an organization URN or company URL.',
				},
				{
					displayName: 'Author Companies',
					name: 'authorCompanies',
					type: 'string',
					default: '',
					placeholder: 'Microsoft; Example Company:urn:li:organization:1234567',
					description:
						'Companies the post author works at, separated by semicolons. Each is a name, or Name:identifier with an organization URN or company URL.',
				},
				{
					displayName: 'Author Industries',
					name: 'authorIndustries',
					type: 'string',
					default: '',
					placeholder: 'Software Development; Technology',
					description: 'Industries the post author works in, separated by semicolons',
				},
			],
		},
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const filter: Record<string, any> = {};
		const advancedFilter = context.getNodeParameter('advancedFilter', this.itemIndex, {}) as {
			customSearchUrl?: string;
			sort?: string;
			datePosted?: string;
			contentType?: string;
			postedBy?: string[];
			fromMembers?: string;
			fromCompanies?: string;
			mentioningMembers?: string;
			mentioningCompanies?: string;
			authorCompanies?: string;
			authorIndustries?: string;
		};

		const {
			sort,
			datePosted,
			contentType,
			postedBy,
			fromMembers,
			fromCompanies,
			mentioningMembers,
			mentioningCompanies,
			authorCompanies,
			authorIndustries,
		} = advancedFilter;

		if (sort) filter.sort = sort;
		if (datePosted) filter.datePosted = datePosted;
		if (contentType) filter.contentType = contentType;
		if (postedBy && postedBy.length > 0) filter.postedBy = postedBy;
		if (fromMembers) {
			filter.fromMembers = this.actorFilterList(context, fromMembers, 'member');
		}
		if (fromCompanies) {
			filter.fromCompanies = this.actorFilterList(context, fromCompanies, 'company');
		}
		if (mentioningMembers) {
			filter.mentioningMembers = this.actorFilterList(context, mentioningMembers, 'member');
		}
		if (mentioningCompanies) {
			filter.mentioningCompanies = this.actorFilterList(context, mentioningCompanies, 'company');
		}
		if (authorCompanies) {
			filter.authorCompanies = this.actorFilterList(context, authorCompanies, 'company');
		}
		if (authorIndustries) {
			filter.authorIndustries = splitList(authorIndustries);
		}

		return {
			term: this.stringParameter(context, 'searchTerm') || undefined,
			limit: this.numberParameter(context, 'limit'),
			customSearchUrl: advancedFilter.customSearchUrl || undefined,
			filter: Object.keys(filter).length > 0 ? filter : undefined,
		};
	}

	private actorFilterList(
		context: IExecuteFunctions,
		value: string,
		actorKind: TActorKind,
	): TActorFilterEntry[] {
		return splitList(value).map((element) => {
			const entry = parseActorFilterElement(element, actorKind);
			if (entry === undefined) {
				throw new NodeOperationError(
					context.getNode(),
					`Invalid filter value "${element}". Expected a name, or Name:identifier with ${EXPECTED_IDENTIFIER_BY_KIND[actorKind]}`,
					{ itemIndex: this.itemIndex },
				);
			}
			return entry;
		});
	}
}

// An identifier is itself full of colons, so a Name:identifier split cannot be positional: the name
// ends where a value that announces itself as a URN or a URL begins.
const ACTOR_FILTER_ELEMENT_PATTERN = /^(.*?)(?::((?:urn:li:|https?:\/\/).*))?$/;

const IDENTIFIER_PATTERNS_BY_KIND = {
	member: [
		/^urn:li:member:\d+$/,
		/^https?:\/\/[^/]*linkedin\.com\/in\//i,
		/^https?:\/\/[^/]*linkedin\.com\/sales\/(?:lead|people)\//i,
	],
	company: [
		/^urn:li:organization:\d+$/,
		/^https?:\/\/[^/]*linkedin\.com\/company\//i,
		/^https?:\/\/[^/]*linkedin\.com\/sales\/company\//i,
	],
} as const;

const EXPECTED_IDENTIFIER_BY_KIND = {
	member: 'a member URN, a profile URL or a Sales Navigator lead URL',
	company: 'an organization URN, a company URL or a Sales Navigator company URL',
} as const;

type TActorKind = keyof typeof IDENTIFIER_PATTERNS_BY_KIND;

type TActorFilterEntry = string | { name: string; id: string };

// A plain element is returned unchanged, so lists of names send exactly what they always did.
function parseActorFilterElement(
	element: string,
	actorKind: TActorKind,
): TActorFilterEntry | undefined {
	const match = ACTOR_FILTER_ELEMENT_PATTERN.exec(element);
	const id = match?.[2]?.trim();
	if (!id) {
		return element;
	}
	const name = match?.[1]?.trim();
	const isExpectedKind = IDENTIFIER_PATTERNS_BY_KIND[actorKind].some((pattern) => pattern.test(id));
	return name && isExpectedKind ? { name, id } : undefined;
}

function splitList(value: string): string[] {
	return value
		.split(';')
		.map((s) => s.trim())
		.filter((s) => s);
}
