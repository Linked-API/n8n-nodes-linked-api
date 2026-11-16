import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { RecruiterLiteLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class RcArchiveProject extends RecruiterLiteLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.rcArchiveProject;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Project ID',
			name: 'projectId',
			type: 'string',
			default: '',
			description: 'Project ID as a string of digits',
			required: true,
			displayOptions: { show: { resource: ['recruiterLite'], operation: ['rcArchiveProject'] } },
		},
	];
	public body(context: IExecuteFunctions): Record<string, unknown> {
		return { projectId: this.stringParameter(context, 'projectId') };
	}
}
