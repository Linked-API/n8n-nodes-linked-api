import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { RecruiterLiteLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class RcRenameProject extends RecruiterLiteLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.rcRenameProject;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Project ID',
			name: 'projectId',
			type: 'string',
			default: '',
			description: 'Project ID as a string of digits',
			required: true,
			displayOptions: { show: { resource: ['recruiterLite'], operation: ['rcRenameProject'] } },
		},
		{
			displayName: 'Name',
			name: 'name',
			type: 'string',
			default: '',
			description: 'Project name, 1–100 characters, one line',
			required: true,
			displayOptions: { show: { resource: ['recruiterLite'], operation: ['rcRenameProject'] } },
		},
		{
			displayName: 'Description',
			name: 'description',
			type: 'string',
			default: '',
			description: 'Description, up to 2000 characters; omit to leave unchanged',
			displayOptions: { show: { resource: ['recruiterLite'], operation: ['rcRenameProject'] } },
		},
	];
	public body(context: IExecuteFunctions): Record<string, unknown> {
		return {
			projectId: this.stringParameter(context, 'projectId'),
			name: this.stringParameter(context, 'name'),
			...(this.stringParameter(context, 'description')
				? { description: this.stringParameter(context, 'description') }
				: {}),
		};
	}
}
