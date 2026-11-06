import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';

export class NvUnsaveAccount extends SalesNavigatorLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.nvUnsaveAccount;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Company URL',
			name: 'companyHashedUrl',
			type: 'string',
			required: true,
			default: '',
			description:
				'URL accepted by the Sales Navigator opener, including an alert subject URL. Unsave the account only; its saved leads stay saved. Repeating succeeds without changes. Sales Navigator can take up to a few minutes to reflect a change. A call that conflicts with a change you just made through Linked API may fail with unexpectedError; retry it a little later.',
			displayOptions: { show: this.show },
		},
	];

	public body(context: IExecuteFunctions): Record<string, unknown> {
		return { companyHashedUrl: this.stringParameter(context, 'companyHashedUrl') };
	}
}
