import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';

export class NvDeleteList extends SalesNavigatorLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.nvDeleteList;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'List ID',
			name: 'listId',
			type: 'string',
			default: '',
			description:
				'Owned list ID as a string, never a number. Members stay saved and in their other lists. Unknown, shared or deleted IDs return listNotFound; system lists without Delete return listNotDeletable. English interface only; Plus required. Success has no result data.',
			required: true,
			displayOptions: { show: this.show },
		},
	];

	public body(context: IExecuteFunctions): Record<string, unknown> {
		return { listId: this.stringParameter(context, 'listId') };
	}
}
