import { IExecuteFunctions, IHttpRequestMethods, NodeApiError } from 'n8n-workflow';

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
	protected itemIndex = 0;

	public get operationFields(): INodeProperties[] {
		return [...this.defaultFields, ...this.fields];
	}

	public async execute(context: IExecuteFunctions, itemIndex: number): Promise<any> {
		this.itemIndex = itemIndex;
		try {
			return await context.helpers.httpRequestWithAuthentication.call(context, 'linkedApi', {
				method: this.method,
				baseURL: 'https://api.linkedapi.io/automation',
				url: this.url(context),
				body: this.requestBody(context),
				qs: this.qs(context),
				headers: {
					...this.headers,
					client: 'n8n',
				},
				json: true,
			});
		} catch (error: any) {
			const criticalError = error.response?.data?.criticalError;
			if (criticalError) {
				const type = criticalError.type || 'LinkedApiError';
				const message = criticalError.message || JSON.stringify(criticalError);
				throw new NodeApiError(context.getNode(), error, {
					message: `${type}: ${message}`,
					itemIndex: this.itemIndex,
				});
			}
			throw new NodeApiError(context.getNode(), error, { itemIndex: this.itemIndex });
		}
	}

	protected get show(): IDisplayOptions['show'] {
		return {
			resource: [this.resource],
			operation: [this.operationName],
		};
	}

	protected stringParameter(context: IExecuteFunctions, parameterName: string): string {
		return context.getNodeParameter(parameterName, this.itemIndex) as string;
	}

	protected booleanParameter(context: IExecuteFunctions, parameterName: string): boolean {
		return context.getNodeParameter(parameterName, this.itemIndex) as boolean;
	}

	protected numberParameter(context: IExecuteFunctions, parameterName: string): number {
		return context.getNodeParameter(parameterName, this.itemIndex) as number;
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

	protected override get defaultFields(): INodeProperties[] {
		return [
			{
				displayName:
					'<b>Important:</b> This action delivers results asynchronously. ' +
					'You must add a <b>Wait</b> node right after this node and set its ' +
					'"Resume" field to <b>"On Webhook Call"</b>. Without the Wait node, ' +
					'your workflow will not receive results. ' +
					'<a href="https://linkedapi.io/integrations/n8n/building-workflows-0" target="_blank">See setup guide</a>',
				name: 'waitNodeRequiredNotice',
				type: 'notice',
				default: '',
				displayOptions: {
					show: this.show,
				},
			},
		];
	}

	override requestBody(context: IExecuteFunctions): Record<string, any> {
		const resumeUrl = context.evaluateExpression('{{$execution.resumeUrl}}', this.itemIndex) as string;
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
