import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { RecruiterLiteLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class RcSaveToProject extends RecruiterLiteLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.rcSaveToProject;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Person URL',
			name: 'personUrl',
			type: 'string',
			default: '',
			description: 'Recruiter profile URL (/talent/profile/…)',
			required: true,
			displayOptions: { show: { resource: ['recruiterLite'], operation: ['rcSaveToProject'] } },
		},
		{
			displayName: 'Project ID',
			name: 'projectId',
			type: 'string',
			default: '',
			description: 'Project ID as a string of digits',
			required: true,
			displayOptions: { show: { resource: ['recruiterLite'], operation: ['rcSaveToProject'] } },
		},
	];
	public body(context: IExecuteFunctions): Record<string, unknown> {
		return {
			personUrl: this.stringParameter(context, 'personUrl'),
			projectId: this.stringParameter(context, 'projectId'),
		};
	}
}
