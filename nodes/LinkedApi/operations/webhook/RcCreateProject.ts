import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { RecruiterLiteLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class RcCreateProject extends RecruiterLiteLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.rcCreateProject;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Name',
			name: 'name',
			type: 'string',
			default: '',
			description:
				'Project name, 1\u2013100 characters, one line. Creation is not idempotent: after a failure, check your projects before creating again (a duplicate can only be archived).',
			required: true,
			displayOptions: { show: { resource: ['recruiterLite'], operation: ['rcCreateProject'] } },
		},
	];
	public body(context: IExecuteFunctions): Record<string, unknown> {
		return { name: this.stringParameter(context, 'name') };
	}
}
