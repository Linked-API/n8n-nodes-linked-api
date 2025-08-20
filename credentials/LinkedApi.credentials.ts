import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class LinkedApi implements ICredentialType {
	name = 'linkedApi';
	displayName = 'Linked API';
	documentationUrl = 'https://linkedapi.io/docs/';

	properties: INodeProperties[] = [
		{
			displayName: 'Linked API Token',
			name: 'linkedApiToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description:
				'Your Linked API token that enables overall Linked API access. You can obtain this from the Linked API Platform.',
		},
		{
			displayName: 'Identification Token',
			name: 'identificationToken',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description:
				'Unique token specific to each managed LinkedIn account. You can obtain this from the Linked API Platform.',
		},
	];
}
