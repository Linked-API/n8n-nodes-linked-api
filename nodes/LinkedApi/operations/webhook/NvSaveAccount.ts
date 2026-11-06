import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';

export class NvSaveAccount extends SalesNavigatorLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.nvSaveAccount;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Company URL',
			name: 'companyHashedUrl',
			type: 'string',
			required: true,
			default: '',
			description:
				'URL accepted by the Sales Navigator opener, including an alert subject URL. Ensure an account is saved; with listId, also ensure membership in that one list, leaving other lists untouched. Without listId, leave lists unchanged. Repeating succeeds without changes. Sales Navigator can take up to a few minutes to reflect a change. A call that conflicts with a change you just made through Linked API may fail with unexpectedError; retry it a little later.',
			displayOptions: { show: this.show },
		},
		{
			displayName: 'List ID',
			name: 'listId',
			type: 'string',
			default: '',
			description:
				'Optional string ID, never a number. Eligible: owned custom account lists or My Current Accounts; other targets return listNotFound. Current limitation: If you have more than 10 account lists, Sales Navigator shows ten lists at a time. If the requested list is not shown, the call fails with unexpectedError. The account may already be saved, but not added to that list.',
			displayOptions: { show: this.show },
		},
	];

	public body(context: IExecuteFunctions): Record<string, unknown> {
		const listId = this.stringParameter(context, 'listId');
		return {
			companyHashedUrl: this.stringParameter(context, 'companyHashedUrl'),
			...(listId ? { listId } : {}),
		};
	}
}
