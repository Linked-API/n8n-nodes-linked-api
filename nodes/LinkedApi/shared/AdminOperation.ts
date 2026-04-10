import { IExecuteFunctions, NodeOperationError } from 'n8n-workflow';

import { LinkedApiOperation } from './LinkedApiOperation';

export abstract class AdminLinkedApiOperation extends LinkedApiOperation {
	resource = 'admin' as const;
	method = 'POST' as const;

	protected abstract endpoint: string;

	url = (_: IExecuteFunctions): string => this.endpoint;

	qs = (_: IExecuteFunctions): Record<string, any> | undefined => undefined;

	public override async execute(context: IExecuteFunctions): Promise<any> {
		const credentials = await context.getCredentials('linkedApi');
		if (!credentials) {
			throw new Error('No credentials found');
		}
		try {
			const response = await context.helpers.httpRequest({
				method: 'POST',
				baseURL: 'https://api.linkedapi.io',
				url: `/admin/${this.endpoint}`,
				body: this.requestBody(context),
				headers: {
					client: 'n8n',
					'linked-api-token': credentials.linkedApiToken as string,
				},
				json: true,
			});
			return response.result ?? response;
		} catch (error) {
			if (error.response?.data) {
				const errorData = error.response.data;
				const errorType = errorData.error?.type || 'LinkedApiError';
				const errorMessage = errorData.error?.message || JSON.stringify(errorData);
				throw new NodeOperationError(context.getNode(), `${errorType}: ${errorMessage}`);
			}
			throw error;
		}
	}
}
