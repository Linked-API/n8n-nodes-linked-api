import type {
	IExecuteFunctions as TExecuteFunctions,
	INodeProperties as TNodeProperties,
} from 'n8n-workflow';
import { LinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';
import { SIGNAL_PARAMETERS } from '../shared/SignalParameters';
import {
	createParameterWithDisplayOptions,
	personUrlParameter,
	companyUrlParameter,
} from '../shared/SharedParameters';

interface TActorEntry {
	name: string;
	id?: string;
}

interface TSignalFilter {
	contentType?: string;
	postedBy?: Array<string>;
	mentioningMembers?: { entries?: Array<TActorEntry> };
	mentioningCompanies?: { entries?: Array<TActorEntry> };
	authorCompanies?: { entries?: Array<TActorEntry> };
	authorIndustries?: Array<string>;
}

export class CreateSignal extends LinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.createSignal;
	public readonly resource = 'other' as const;
	public readonly method = 'POST' as const;
	public readonly fields: Array<TNodeProperties> = [
		createParameterWithDisplayOptions(SIGNAL_PARAMETERS.type, this.show),
		{
			displayName: 'Label',
			name: 'label',
			type: 'string',
			default: '',
			typeOptions: { maxLength: 64 },
			displayOptions: { show: this.show },
			description: 'Your label, up to 64 characters, returned with the signal and its events',
		},
		createParameterWithDisplayOptions(personUrlParameter, { ...this.show, type: ['personPosts'] }),
		createParameterWithDisplayOptions(companyUrlParameter, {
			...this.show,
			type: ['companyPosts'],
		}),
		{
			displayName: 'My Posts',
			name: 'myPosts',
			type: 'boolean',
			default: false,
			displayOptions: { show: { ...this.show, type: ['postEngagement'] } },
			description: 'Whether to watch engagement on your own posts instead of one post URL',
		},
		{
			displayName: 'Post URL',
			name: 'postUrl',
			type: 'string',
			default: '',
			required: true,
			displayOptions: { show: { ...this.show, type: ['postEngagement'], myPosts: [false] } },
			description: 'LinkedIn post whose comments and reactions to watch',
		},
		{
			displayName: 'Phrases',
			name: 'term',
			type: 'string',
			default: [],
			required: true,
			typeOptions: { multipleValues: true, multipleValueButtonText: 'Add Phrase' },
			displayOptions: { show: { ...this.show, type: ['postSearch'] } },
			description: 'One to three phrases to watch for in new posts',
		},
		createParameterWithDisplayOptions(SIGNAL_PARAMETERS.filter, {
			...this.show,
			type: ['postSearch'],
		}),
	];

	public url(): string {
		return '/signals';
	}

	public requestBody(context: TExecuteFunctions): Record<string, unknown> {
		const type = this.stringParameter(context, 'type');
		const label = this.stringParameter(context, 'label');
		const body: Record<string, unknown> = { type, ...(label ? { label } : {}) };
		switch (type) {
			case 'personPosts':
				body.personUrl = this.stringParameter(context, 'personUrl');
				break;
			case 'companyPosts':
				body.companyUrl = this.stringParameter(context, 'companyUrl');
				break;
			case 'postEngagement':
				if (context.getNodeParameter('myPosts', this.itemIndex) === true) {
					body.myPosts = true;
				} else {
					body.postUrl = this.stringParameter(context, 'postUrl');
				}
				break;
			case 'postSearch': {
				body.term = context.getNodeParameter('term', this.itemIndex, []);
				const input = context.getNodeParameter('filter', this.itemIndex, {}) as TSignalFilter;
				const { contentType, postedBy, authorIndustries } = input;
				const filter: Record<string, unknown> = {};
				if (contentType) {
					filter.contentType = contentType;
				}
				if (postedBy?.length) {
					filter.postedBy = postedBy;
				}
				if (authorIndustries?.length) {
					filter.authorIndustries = authorIndustries;
				}
				for (const key of [
					'mentioningMembers',
					'mentioningCompanies',
					'authorCompanies',
				] as const) {
					const entries = input[key]?.entries;
					if (entries?.length) {
						filter[key] = entries.map(
							({ name, id }): TActorEntry => ({ name, ...(id ? { id } : {}) }),
						);
					}
				}
				if (Object.keys(filter).length) {
					body.filter = filter;
				}
				break;
			}
		}
		return body;
	}
}
