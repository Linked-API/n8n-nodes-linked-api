import { IExecuteFunctions, IHttpRequestMethods, NodeOperationError } from 'n8n-workflow';

import { INodeProperties, IDisplayOptions } from 'n8n-workflow';
import { TGroup } from './AvailableGroups';
import { TAvailableAction } from './AvailableActions';

export abstract class LinkedApiOperation {
	protected abstract fields: INodeProperties[];
	protected get defaultFields(): INodeProperties[] {
		return [];
	}
	public abstract operationName: TAvailableAction;
	public abstract resource: TGroup;

	public get operationFields(): INodeProperties[] {
		return [...this.defaultFields, ...this.fields];
	}

	public async execute(context: IExecuteFunctions): Promise<any> {
		const credentials = await context.getCredentials('linkedApi');
		if (!credentials) {
			throw new Error('No credentials found');
		}
		try {
			return await context.helpers.httpRequest({
				method: this.method,
				baseURL: 'https://api.linkedapi.io/automation',
				url: this.url(context),
				body: this.requestBody(context),
				qs: this.qs(context),
				headers: {
					...this.headers,
					client: 'n8n',
					'identification-token': credentials.identificationToken as string,
					'linked-api-token': credentials.linkedApiToken as string,
				},
				json: true,
			});
		} catch (error) {
			if (error.response?.data) {
				const errorType = error.response.data.criticalError?.type || 'LinkedApiError';
				const criticalError = error.response.data.criticalError;
				if (criticalError) {
					const type = criticalError.type || 'LinkedApiError';
					const message = criticalError.message || JSON.stringify(criticalError);
					throw new NodeOperationError(context.getNode(), `${type}: ${message}`);
				}
				throw new NodeOperationError(context.getNode(), JSON.stringify(error.response.data), {
					type: errorType,
					description: JSON.stringify(error.response.data),
				});
			}
			throw error;
		}
	}

	protected get show(): IDisplayOptions['show'] {
		return {
			resource: [this.resource],
			operation: [this.operationName],
		};
	}

	protected stringParameter(context: IExecuteFunctions, parameterName: string): string {
		return context.getNodeParameter(parameterName, 0) as string;
	}

	protected booleanParameter(context: IExecuteFunctions, parameterName: string): boolean {
		return context.getNodeParameter(parameterName, 0) as boolean;
	}

	protected numberParameter(context: IExecuteFunctions, parameterName: string): number {
		return context.getNodeParameter(parameterName, 0) as number;
	}

	protected abstract url(context: IExecuteFunctions): string;
	protected abstract method: IHttpRequestMethods;
	protected abstract requestBody(context: IExecuteFunctions): Record<string, any> | undefined;
	protected qs = (_: IExecuteFunctions): Record<string, any> | undefined => undefined;
	protected headers: Record<string, any> = {};
}

export abstract class LinkedApiWebhookOperation extends LinkedApiOperation {
	abstract body(context: IExecuteFunctions): Record<string, any>;
	url = (_: IExecuteFunctions): string => '/workflows';
	method = 'POST' as const;
	headers = {
		'result-retrieval': 'webhook',
	};

	override requestBody(context: IExecuteFunctions): Record<string, any> {
		const resumeUrl = context.evaluateExpression('{{$execution.resumeUrl}}', 0) as string;
		if (!resumeUrl) {
			throw new Error("Wait node wasn't found. Please check your workflow.");
		}
		if (resumeUrl && resumeUrl.includes('//localhost')) {
			throw new Error('Localhost running is not allowed. Please use a public n8n instance.');
		}
		return {
			data: this.body(context),
			webhookUrl: resumeUrl,
			operationName: this.operationName,
		};
	}
}

export abstract class StandardLinkedApiOperation extends LinkedApiWebhookOperation {
	resource = 'standard' as const;
}

export abstract class SalesNavigatorLinkedApiOperation extends LinkedApiWebhookOperation {
	resource = 'salesNavigator' as const;
}

export abstract class OtherLinkedApiOperation extends LinkedApiWebhookOperation {
	resource = 'other' as const;
}
