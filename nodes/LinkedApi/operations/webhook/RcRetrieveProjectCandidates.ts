import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { RecruiterLiteLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class RcRetrieveProjectCandidates extends RecruiterLiteLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.rcRetrieveProjectCandidates;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Project ID',
			name: 'projectId',
			type: 'string',
			default: '',
			description: 'Project ID as a string of digits',
			required: true,
			displayOptions: {
				show: { resource: ['recruiterLite'], operation: ['rcRetrieveProjectCandidates'] },
			},
		},
		{
			displayName: 'Stage',
			name: 'stage',
			type: 'options',
			default: '',
			options: [
				{ name: 'Archived', value: 'archived' },
				{ name: 'Contacted', value: 'contacted' },
				{ name: 'Not Set', value: '' },
				{ name: 'Replied', value: 'replied' },
				{ name: 'Uncontacted', value: 'uncontacted' },
			],
			displayOptions: {
				show: { resource: ['recruiterLite'], operation: ['rcRetrieveProjectCandidates'] },
			},
		},
		{
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			default: 25,
			description: 'Max number of results to return',
			typeOptions: { numberPrecision: 0 },
			displayOptions: {
				show: { resource: ['recruiterLite'], operation: ['rcRetrieveProjectCandidates'] },
			},
		},
	];
	public body(context: IExecuteFunctions): Record<string, unknown> {
		return {
			limit: this.numberParameter(context, 'limit'),
			projectId: this.stringParameter(context, 'projectId'),
			...(this.stringParameter(context, 'stage')
				? { stage: this.stringParameter(context, 'stage') }
				: {}),
		};
	}
}
