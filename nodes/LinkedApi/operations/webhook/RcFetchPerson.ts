import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { RecruiterLiteLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class RcFetchPerson extends RecruiterLiteLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.rcFetchPerson;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Person URL',
			name: 'personUrl',
			type: 'string',
			default: '',
			description: 'Recruiter profile URL (/talent/profile/…)',
			required: true,
			displayOptions: { show: { resource: ['recruiterLite'], operation: ['rcFetchPerson'] } },
		},
		{
			displayName: 'Basic Info',
			name: 'basicInfo',
			type: 'boolean',
			default: true,
			description: 'Whether to read candidate details',
			displayOptions: { show: { resource: ['recruiterLite'], operation: ['rcFetchPerson'] } },
		},
		{
			displayName: 'Recruiting Activity',
			name: 'recruitingActivity',
			type: 'boolean',
			default: false,
			description: 'Whether to read recruiting activity counts',
			displayOptions: { show: { resource: ['recruiterLite'], operation: ['rcFetchPerson'] } },
		},
	];
	public body(context: IExecuteFunctions): Record<string, unknown> {
		return {
			personUrl: this.stringParameter(context, 'personUrl'),
			basicInfo: this.booleanParameter(context, 'basicInfo'),
			recruitingActivity: this.booleanParameter(context, 'recruitingActivity'),
		};
	}
}
