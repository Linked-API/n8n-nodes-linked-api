import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';

export class NvRemoveLeadFromList extends SalesNavigatorLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.nvRemoveLeadFromList;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Person URL',
			name: 'personHashedUrl',
			type: 'string',
			default: '',
			description:
				'Public or hashed LinkedIn person URL, including /in/... and /sales/lead/... or an alert subject URL.',
			required: true,
			displayOptions: { show: this.show },
		},
		{
			displayName: 'List ID',
			name: 'listId',
			type: 'string',
			default: '',
			description: 'Owned list ID as a string, never a number',
			required: true,
			displayOptions: { show: this.show },
		},
	];

	public body(context: IExecuteFunctions): Record<string, unknown> {
		return {
			personHashedUrl: this.stringParameter(context, 'personHashedUrl'),
			listId: this.stringParameter(context, 'listId'),
		};
	}
}
