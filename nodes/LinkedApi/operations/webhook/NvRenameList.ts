import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';

export class NvRenameList extends SalesNavigatorLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.nvRenameList;
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
			displayName: 'Name',
			name: 'name',
			type: 'string',
			default: '',
			description: 'Trimmed name, 1–75 characters without line breaks',
			required: true,
			displayOptions: { show: this.show },
		},
	];

	public body(context: IExecuteFunctions): Record<string, unknown> {
		return {
			listId: this.stringParameter(context, 'listId'),
			name: this.stringParameter(context, 'name'),
		};
	}
}
