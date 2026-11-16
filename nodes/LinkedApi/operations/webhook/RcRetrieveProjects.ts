import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { RecruiterLiteLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class RcRetrieveProjects extends RecruiterLiteLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.rcRetrieveProjects;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			default: 25,
			description: 'Max number of results to return',
			typeOptions: { numberPrecision: 0 },
			displayOptions: { show: { resource: ['recruiterLite'], operation: ['rcRetrieveProjects'] } },
		},
	];
	public body(context: IExecuteFunctions): Record<string, unknown> {
		return { limit: this.numberParameter(context, 'limit') };
	}
}
