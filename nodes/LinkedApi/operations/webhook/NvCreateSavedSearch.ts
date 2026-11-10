import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';

export class NvCreateSavedSearch extends SalesNavigatorLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.nvCreateSavedSearch;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Type',
			name: 'type',
			type: 'options',
			default: 'lead',
			description: 'Sales Navigator subject type',
			required: true,
			options: [
				{
					name: 'Account',
					value: 'account',
				},
				{
					name: 'Lead',
					value: 'lead',
				},
			],
			displayOptions: { show: this.show },
		},
		{
			displayName: 'Search URL',
			name: 'customSearchUrl',
			type: 'string',
			default: '',
			description:
				'Sales Navigator search URL copied from /sales/search/people for lead or /sales/search/company for account; must match type',
			required: true,
			displayOptions: { show: this.show },
		},
		{
			displayName: 'Name',
			name: 'name',
			type: 'string',
			default: '',
			description:
				'Optional name for the saved search; trimmed, single line, 1–256 characters. A name already used by a saved search of the same type returns savedSearchAlreadyExists. Blank keeps the name Sales Navigator gives it.',
			displayOptions: { show: this.show },
		},
	];

	public body(context: IExecuteFunctions): Record<string, unknown> {
		const name = this.stringParameter(context, 'name');
		return {
			type: this.stringParameter(context, 'type'),
			customSearchUrl: this.stringParameter(context, 'customSearchUrl'),
			...(name.trim() ? { name } : {}),
		};
	}
}
