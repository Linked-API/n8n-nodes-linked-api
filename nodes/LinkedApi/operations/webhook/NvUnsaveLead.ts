import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';

export class NvUnsaveLead extends SalesNavigatorLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.nvUnsaveLead;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Person URL',
			name: 'personHashedUrl',
			type: 'string',
			required: true,
			default: '',
			description:
				"URL accepted by the Sales Navigator opener, including an alert subject URL. Use Sales Navigator's native unsave: the lead is no longer saved and leaves every custom list the user owns. Repeating succeeds without changes. Sales Navigator can take up to a few minutes to reflect a change. A call that conflicts with a change you just made through Linked API may fail with unexpectedError; retry it a little later.",
			displayOptions: { show: this.show },
		},
	];

	public body(context: IExecuteFunctions): Record<string, unknown> {
		return { personHashedUrl: this.stringParameter(context, 'personHashedUrl') };
	}
}
