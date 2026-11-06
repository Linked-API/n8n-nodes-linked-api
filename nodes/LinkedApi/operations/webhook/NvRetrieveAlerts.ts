import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';

export class NvRetrieveAlerts extends SalesNavigatorLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.nvRetrieveAlerts;

	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			typeOptions: { minValue: 1 },
			default: 50,
			description: 'Max number of results to return',
			displayOptions: { show: this.show },
		},
		{
			displayName: 'Sort',
			name: 'sort',
			type: 'options',
			options: [
				{ name: 'Latest', value: 'latest' },
				{ name: 'Relevance', value: 'relevance' },
			],
			default: 'latest',
			description: 'Sales Navigator alert ordering',
			displayOptions: { show: this.show },
		},
		{
			displayName: 'List ID',
			name: 'listId',
			type: 'string',
			default: '',
			description: 'Owned list ID; requires latest sorting',
			displayOptions: { show: this.show },
		},
		{
			displayName: 'Subjects',
			name: 'subjects',
			type: 'string',
			default: [],
			typeOptions: {
				multipleValues: true,
				multipleValueButtonText: 'Add Subject',
			},
			description:
				'Recognised hashed LinkedIn URLs or Sales Navigator subject URNs; one identity per value, without splitting commas. Any listed subject may match; other filters are ANDed. Leave empty for all subjects.',
			displayOptions: { show: this.show },
		},
		{
			displayName: 'Category',
			name: 'category',
			type: 'options',
			options: [
				{ name: 'Account', value: 'account' },
				{ name: 'Both', value: '' },
				{ name: 'Lead', value: 'lead' },
			],
			default: '',
			description: 'Filter by the alert subject category',
			displayOptions: { show: this.show },
		},
		{
			displayName: 'Types',
			name: 'types',
			type: 'string',
			default: '',
			description:
				'Exact upstream machine codes separated by semicolons; leave empty for all types',
			displayOptions: { show: this.show },
		},
		{
			displayName: 'Since',
			name: 'since',
			type: 'string',
			default: '',
			description: 'Include alerts published at or after this ISO timestamp',
			displayOptions: { show: this.show },
		},
		{
			displayName: 'Exclude Suggested',
			name: 'excludeSuggested',
			type: 'boolean',
			default: false,
			description:
				'Whether to return only subjects confirmed as saved, excluding unsaved and unknown saved states',
			displayOptions: { show: this.show },
		},
	];

	public body(context: IExecuteFunctions): Record<string, unknown> {
		const limit = this.numberParameter(context, 'limit');
		if (!Number.isInteger(limit) || limit < 1 || limit > 1000) {
			throw new Error('Limit must be an integer between 1 and 1000');
		}
		const listId = this.stringParameter(context, 'listId');
		const subjects = context.getNodeParameter('subjects', this.itemIndex, []) as Array<string>;
		const sort = this.stringParameter(context, 'sort');
		if (listId && sort === 'relevance') {
			throw new Error('List ID requires latest sorting');
		}
		const category = this.stringParameter(context, 'category');
		const types = this.stringParameter(context, 'types')
			.split(';')
			.map((type): string => type.trim())
			.filter(Boolean);
		const since = this.stringParameter(context, 'since');

		return {
			limit,
			sort,
			filter: {
				...(listId ? { listId } : {}),
				...(subjects.length ? { subjects } : {}),
				...(category ? { category } : {}),
				types,
				...(since ? { since } : {}),
				excludeSuggested: this.booleanParameter(context, 'excludeSuggested'),
			},
		};
	}
}
