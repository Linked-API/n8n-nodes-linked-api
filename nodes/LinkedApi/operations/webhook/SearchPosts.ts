/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-multi-options-type-unsorted-items */
import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
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
					placeholder: 'Bill Gates; Satya Nadella',
					description: 'Names of people whose posts to keep, separated by semicolons',
				},
				{
					displayName: 'From Companies',
					name: 'fromCompanies',
					type: 'string',
					default: '',
					placeholder: 'Microsoft; Google',
					description: 'Names of companies whose posts to keep, separated by semicolons',
				},
				{
					displayName: 'Mentioning Members',
					name: 'mentioningMembers',
					type: 'string',
					default: '',
					placeholder: 'Bill Gates; Satya Nadella',
					description: 'Names of people to look for in post text, separated by semicolons',
				},
				{
					displayName: 'Mentioning Companies',
					name: 'mentioningCompanies',
					type: 'string',
					default: '',
					placeholder: 'Microsoft; Google',
					description: 'Names of companies to look for in post text, separated by semicolons',
				},
				{
					displayName: 'Author Companies',
					name: 'authorCompanies',
					type: 'string',
					default: '',
					placeholder: 'Microsoft; Google',
					description: 'Names of companies the post author works at, separated by semicolons',
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
			filter.fromMembers = splitList(fromMembers);
		}
		if (fromCompanies) {
			filter.fromCompanies = splitList(fromCompanies);
		}
		if (mentioningMembers) {
			filter.mentioningMembers = splitList(mentioningMembers);
		}
		if (mentioningCompanies) {
			filter.mentioningCompanies = splitList(mentioningCompanies);
		}
		if (authorCompanies) {
			filter.authorCompanies = splitList(authorCompanies);
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
}

function splitList(value: string): string[] {
	return value
		.split(';')
		.map((s) => s.trim())
		.filter((s) => s);
}
