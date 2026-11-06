import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';

export class NvCreateList extends SalesNavigatorLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.nvCreateList;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Type',
			name: 'type',
			type: 'options',
			default: 'lead',
			description: 'Owned list type to create',
			required: true,
			options: [
				{
					name: 'Account',
					value: 'account',
				},
				{
					name: 'Lead',
					value: 'lead',
				},
			],
			displayOptions: { show: this.show },
		},
		{
			displayName: 'Name',
			name: 'name',
			type: 'string',
			default: '',
			description:
				'Name is trimmed and must contain 1–75 characters. Same-type names equal after trimming, case-sensitive, including system lists, return listAlreadyExists and create nothing.',
			required: true,
			displayOptions: { show: this.show },
		},
		{
			displayName: 'Description',
			name: 'description',
			type: 'string',
			default: '',
			description:
				'Optional description; surrounding spaces are trimmed. Up to 350 characters after trimming; blank omitted. Returns ID (string), name, type and URL. English interface only; Plus required.',
			displayOptions: { show: this.show },
		},
	];

	public body(context: IExecuteFunctions): Record<string, unknown> {
		const description = this.stringParameter(context, 'description');
		return {
			type: this.stringParameter(context, 'type'),
			name: this.stringParameter(context, 'name'),
			...(description ? { description } : {}),
		};
	}
}
