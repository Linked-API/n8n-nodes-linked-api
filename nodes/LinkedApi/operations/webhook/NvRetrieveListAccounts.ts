import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';

export class NvRetrieveListAccounts extends SalesNavigatorLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.nvRetrieveListAccounts;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'List ID',
			name: 'listId',
			type: 'string',
			default: '',
			description: 'Owned list ID as a string, never a number',
			required: true,
			displayOptions: { show: this.show },
		},
		{
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			default: 25,
			description: 'Max number of results to return',
			typeOptions: {
				minValue: 1,
				numberPrecision: 0,
			},
			displayOptions: { show: this.show },
		},
	];

	public body(context: IExecuteFunctions): Record<string, unknown> {
		const limit = this.numberParameter(context, 'limit');
		if (!Number.isInteger(limit) || limit < 1 || limit > 1000) {
			throw new Error('Limit must be an integer between 1 and 1000');
		}
		return {
			listId: this.stringParameter(context, 'listId'),
			limit,
		};
	}
}
