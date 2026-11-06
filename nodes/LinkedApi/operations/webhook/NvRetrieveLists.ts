import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';

export class NvRetrieveLists extends SalesNavigatorLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.nvRetrieveLists;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Type',
			name: 'type',
			type: 'options',
			options: [
				{ name: 'Account', value: 'account' },
				{ name: 'Lead', value: 'lead' },
			],
			required: true,
			default: 'lead',
			description:
				'Retrieve every owned Sales Navigator list of the requested type. Results contain ID (string), name, type (lead/account), source (open upstream string), entityCount (number or null), and URL.',
			displayOptions: { show: this.show },
		},
	];

	public body(context: IExecuteFunctions): Record<string, unknown> {
		return { type: this.stringParameter(context, 'type') };
	}
}
