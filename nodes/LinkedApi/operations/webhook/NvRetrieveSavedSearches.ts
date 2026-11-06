import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';

export class NvRetrieveSavedSearches extends SalesNavigatorLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.nvRetrieveSavedSearches;
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
	];

	public body(context: IExecuteFunctions): Record<string, unknown> {
		return {
			type: this.stringParameter(context, 'type'),
		};
	}
}
