import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { StandardLinkedApiOperation } from './LinkedApiOperation';

const INVITATION_TYPE = {
	connect: 'connect',
	companyFollow: 'companyFollow',
	newsletterSubscribe: 'newsletterSubscribe',
} as const;

type TInvitationType = (typeof INVITATION_TYPE)[keyof typeof INVITATION_TYPE];

export abstract class InvitationOperation extends StandardLinkedApiOperation {
	public body(context: IExecuteFunctions): Record<string, string> {
		const invitationType = this.stringParameter(context, 'invitationType') as TInvitationType;
		const body = { invitationType } as Record<string, string>;

		switch (invitationType) {
			case INVITATION_TYPE.connect:
				body.personUrl = this.stringParameter(context, 'personUrl');
				break;
			case INVITATION_TYPE.companyFollow:
				body.companyUrl = this.stringParameter(context, 'companyUrl');
				break;
			case INVITATION_TYPE.newsletterSubscribe:
				body.newsletterUrl = this.stringParameter(context, 'newsletterUrl');
				break;
		}

		return body;
	}

	protected get fields(): Array<INodeProperties> {
		return [
			{
				displayName: 'Invitation Type',
				name: 'invitationType',
				type: 'options',
				required: true,
				default: 'connect',
				displayOptions: { show: this.show },
				options: [
					{ name: 'Connect', value: INVITATION_TYPE.connect },
					{ name: 'Company Follow', value: INVITATION_TYPE.companyFollow },
					{ name: 'Newsletter Subscribe', value: INVITATION_TYPE.newsletterSubscribe },
				],
				description: 'Type of incoming invitation to accept or ignore',
			},
			{
				displayName: 'Person URL',
				name: 'personUrl',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'https://www.linkedin.com/in/john-doe',
				displayOptions: {
					show: { ...this.show, invitationType: [INVITATION_TYPE.connect] },
				},
				description: 'Public or hashed LinkedIn URL of the person who sent the invitation',
			},
			{
				displayName: 'Company URL',
				name: 'companyUrl',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'https://www.linkedin.com/company/microsoft',
				displayOptions: {
					show: { ...this.show, invitationType: [INVITATION_TYPE.companyFollow] },
				},
				description: 'LinkedIn URL of the company to follow',
			},
			{
				displayName: 'Newsletter URL',
				name: 'newsletterUrl',
				type: 'string',
				required: true,
				default: '',
				placeholder: 'https://www.linkedin.com/newsletters/example-1234567890',
				displayOptions: {
					show: { ...this.show, invitationType: [INVITATION_TYPE.newsletterSubscribe] },
				},
				description: 'LinkedIn URL of the newsletter to subscribe to',
			},
		];
	}

}
