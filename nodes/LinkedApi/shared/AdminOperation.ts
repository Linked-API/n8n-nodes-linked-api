import { IExecuteFunctions, NodeApiError } from 'n8n-workflow';

import { LinkedApiOperation } from './LinkedApiOperation';

export abstract class AdminLinkedApiOperation extends LinkedApiOperation {
	resource = 'admin' as const;
	method = 'POST' as const;

	protected abstract endpoint: string;

	url = (_: IExecuteFunctions): string => this.endpoint;

	qs = (_: IExecuteFunctions): Record<string, any> | undefined => undefined;

	public override async execute(context: IExecuteFunctions, itemIndex: number): Promise<any> {
		this.itemIndex = itemIndex;
		try {
			const response = await context.helpers.httpRequestWithAuthentication.call(
				context,
				'linkedApi',
				{
					method: 'POST',
					baseURL: 'https://api.linkedapi.io',
					url: `/admin/${this.endpoint}`,
					body: this.requestBody(context),
					headers: {
						client: 'n8n',
					},
					json: true,
				},
			);
			return response.result ?? response;
		} catch (error: any) {
			const apiError = error.response?.data?.error;
			if (apiError) {
				const type = apiError.type || 'LinkedApiError';
				const message = apiError.message || JSON.stringify(error.response.data);
				throw new NodeApiError(context.getNode(), error, {
					message: `${type}: ${message}`,
					itemIndex: this.itemIndex,
				});
			}
			throw new NodeApiError(context.getNode(), error, { itemIndex: this.itemIndex });
		}
	}
}
