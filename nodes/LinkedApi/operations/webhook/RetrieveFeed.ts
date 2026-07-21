import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';

export class RetrieveFeed extends StandardLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.retrieveFeed;

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
	];

	public body(context: IExecuteFunctions): Record<string, number> {
		return {
			limit: this.numberParameter(context, 'limit'),
		};
	}
}
