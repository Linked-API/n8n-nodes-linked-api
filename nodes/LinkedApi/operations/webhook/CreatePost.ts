import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	postTextParameter,
	postCompanyUrlParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class CreatePost extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.createPost;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(postTextParameter, this.show),
		createParameterWithDisplayOptions(postCompanyUrlParameter, this.show),
		{
			displayName: 'Attachments',
			name: 'attachments',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
				maxValue: 9,
			},
			default: {},
			displayOptions: { show: this.show },
			description: 'Media attachments for the post (max 9 images, or 1 video, or 1 document)',
			placeholder: 'Add Attachment',
			options: [
				{
					name: 'attachment',
					displayName: 'Attachment',
					values: [
						{
							displayName: 'Type',
							name: 'type',
							type: 'options',
							default: 'image',
							description: 'Type of media attachment',
							// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
							options: [
								{
									name: 'Image',
									value: 'image',
									description: 'Image file (JPEG, PNG, GIF, WebP; max 8MB)',
								},
								{
									name: 'Video',
									value: 'video',
									description: 'Video file (MP4, MOV, WebM; max 200MB)',
								},
								{
									name: 'Document',
									value: 'document',
									description: 'PDF document (max 100MB)',
								},
							],
						},
						{
							displayName: 'URL',
							name: 'url',
							type: 'string',
							default: '',
							placeholder: 'https://example.com/file.jpg',
							description: 'Publicly accessible URL of the media file',
						},
						{
							displayName: 'Document Name',
							name: 'name',
							type: 'string',
							default: '',
							placeholder: 'My Document',
							description: 'Display name for the document (required for documents)',
							displayOptions: {
								show: {
									type: ['document'],
								},
							},
						},
					],
				},
			],
		},
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const text = this.stringParameter(context, 'postText');
		const companyUrl = this.stringParameter(context, 'postCompanyUrl');
		const attachmentsData = context.getNodeParameter('attachments', 0, {}) as {
			attachment?: Array<{ type: string; url: string; name?: string }>;
		};

		const body: Record<string, any> = { text };

		if (companyUrl) {
			body.companyUrl = companyUrl;
		}

		if (attachmentsData.attachment && attachmentsData.attachment.length > 0) {
			body.attachments = attachmentsData.attachment.map((item) => {
				const attachment: Record<string, string> = {
					url: item.url,
					type: item.type,
				};

				if (item.type === 'document' && item.name) {
					attachment.name = item.name;
				}

				return attachment;
			});
		}

		return body;
	}
}
