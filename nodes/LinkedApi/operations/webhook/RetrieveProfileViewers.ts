import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';

export class RetrieveProfileViewers extends StandardLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.retrieveProfileViewers;

	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			typeOptions: {
				minValue: 1,
			},
			default: 20,
			description: 'Max number of results to return',
			displayOptions: {
				show: this.show,
			},
		},
		{
			displayName: 'Since',
			name: 'since',
			type: 'string',
			default: '',
			description:
				'Only viewers seen at or after this ISO 8601 timestamp, for example 2026-08-01T00:00:00Z',
			displayOptions: {
				show: this.show,
			},
		},
	];

	public body(context: IExecuteFunctions): Record<string, number | string> {
		const since = this.stringParameter(context, 'since');

		return {
			limit: this.numberParameter(context, 'limit'),
			...(since ? { since } : {}),
		};
	}
}
