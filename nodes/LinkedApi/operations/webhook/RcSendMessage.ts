import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { RecruiterLiteLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { NodeOperationError } from 'n8n-workflow';

export class RcSendMessage extends RecruiterLiteLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.rcSendMessage;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'Person URL',
			name: 'personUrl',
			type: 'string',
			default: '',
			description: 'New InMail: Recruiter profile URL; exclusive with thread ID',
			displayOptions: { show: { resource: ['recruiterLite'], operation: ['rcSendMessage'] } },
		},
		{
			displayName: 'Thread ID',
			name: 'threadId',
			type: 'string',
			default: '',
			description: 'Reply thread ID; exclusive with person URL and subject',
			displayOptions: { show: { resource: ['recruiterLite'], operation: ['rcSendMessage'] } },
		},
		{
			displayName: 'Message Subject',
			name: 'messageSubject',
			type: 'string',
			default: '',
			description: 'New InMail subject: required, 1–200 characters, one line; omit for a reply',
			displayOptions: { show: { resource: ['recruiterLite'], operation: ['rcSendMessage'] } },
		},
		{
			displayName: 'Message Text',
			name: 'messageText',
			type: 'string',
			default: '',
			description: 'Message text, 1–1900 characters',
			required: true,
			displayOptions: { show: { resource: ['recruiterLite'], operation: ['rcSendMessage'] } },
		},
		{
			displayName: 'Allow Paid Credit',
			name: 'allowPaidCredit',
			type: 'boolean',
			default: false,
			description:
				'Whether to allow a paid InMail credit to be spent only when true. Turn on Allow Paid Credit only when the user has explicitly approved spending a paid InMail credit on this message; on inMailCreditRequired, ask the user instead of retrying with Allow Paid Credit on.',
			displayOptions: { show: { resource: ['recruiterLite'], operation: ['rcSendMessage'] } },
		},
	];
	public body(context: IExecuteFunctions): Record<string, unknown> {
		const personUrl = this.stringParameter(context, 'personUrl');
		const threadId = this.stringParameter(context, 'threadId');
		const subject = this.stringParameter(context, 'messageSubject');
		if (threadId ? Boolean(personUrl || subject) : !personUrl || !subject)
			throw new NodeOperationError(
				context.getNode(),
				'Provide person URL and subject for new InMail, or thread ID without person URL or subject for a reply',
			);
		return {
			text: this.stringParameter(context, 'messageText'),
			allowPaidCredit: this.booleanParameter(context, 'allowPaidCredit'),
			...(threadId ? { threadId } : { personUrl, subject }),
		};
	}
}
