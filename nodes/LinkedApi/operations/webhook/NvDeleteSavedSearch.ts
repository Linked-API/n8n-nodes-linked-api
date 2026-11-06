import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';

export class NvDeleteSavedSearch extends SalesNavigatorLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.nvDeleteSavedSearch;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Saved Search ID',
			name: 'savedSearchId',
			type: 'string',
			default: '',
			description: 'Owned saved-search ID as a positive decimal string',
			required: true,
			displayOptions: { show: this.show },
		},
	];

	public body(context: IExecuteFunctions): Record<string, unknown> {
		return {
			savedSearchId: this.stringParameter(context, 'savedSearchId'),
		};
	}
}
