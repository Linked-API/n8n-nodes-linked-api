import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';

export class NvRemoveAccountFromList extends SalesNavigatorLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.nvRemoveAccountFromList;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Company URL',
			name: 'companyHashedUrl',
			type: 'string',
			default: '',
			description:
				'Public or hashed LinkedIn company URL, including /company/... and /sales/company/... or an alert subject URL.',
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
			companyHashedUrl: this.stringParameter(context, 'companyHashedUrl'),
			listId: this.stringParameter(context, 'listId'),
		};
	}
}
