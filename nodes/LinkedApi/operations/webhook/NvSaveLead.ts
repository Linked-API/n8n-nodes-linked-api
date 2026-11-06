import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';

export class NvSaveLead extends SalesNavigatorLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.nvSaveLead;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Person URL',
			name: 'personHashedUrl',
			type: 'string',
			required: true,
			default: '',
			description:
				'URL accepted by the Sales Navigator opener, including an alert subject URL. Ensure a lead is saved; with listId, also ensure membership in that one list, leaving other lists untouched. Without listId, leave lists unchanged. Repeating succeeds without changes. Saving a lead may also save its current company in Sales Navigator. Sales Navigator can take up to a few minutes to reflect a change. A call that conflicts with a change you just made through Linked API may fail with unexpectedError; retry it a little later.',
			displayOptions: { show: this.show },
		},
		{
			displayName: 'List ID',
			name: 'listId',
			type: 'string',
			default: '',
			description:
				'Optional string ID, never a number. Eligible: owned custom lead lists; other targets return listNotFound. Current limitation: If you have more than 10 lead lists, Sales Navigator shows ten lists at a time. If the requested list is not shown, the call fails with unexpectedError. The lead may already be saved, but not added to that list.',
			displayOptions: { show: this.show },
		},
	];

	public body(context: IExecuteFunctions): Record<string, unknown> {
		const listId = this.stringParameter(context, 'listId');
		return {
			personHashedUrl: this.stringParameter(context, 'personHashedUrl'),
			...(listId ? { listId } : {}),
		};
	}
}
