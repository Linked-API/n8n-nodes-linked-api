import { GenericValue, IExecuteFunctions, NodeApiError, JsonObject } from 'n8n-workflow';
import {
	HttpClient,
	LinkedApiError,
	TLinkedApiConfig,
	TLinkedApiErrorType,
	TLinkedApiResponse,
} from '../linkedapi-node';

export class LinkedApiHttpClient extends HttpClient {
	private readonly executeFunctions: IExecuteFunctions;
	private readonly baseUrl: string;
	private readonly headers: Record<string, string>;

	constructor(executeFunctions: IExecuteFunctions, config: TLinkedApiConfig) {
		super();
		this.executeFunctions = executeFunctions;
		this.baseUrl = 'https://api.linkedapi.io';
		this.headers = {
			'Content-Type': 'application/json',
			'linked-api-token': config.linkedApiToken,
			'identification-token': config.identificationToken,
		};
	}

	private handleError(error: any): never {
		const responseData = error.response?.data ?? error.data;
		if (responseData?.success === false && responseData?.error) {
			const linkedApiError = responseData.error as { message: string; type: string };
			throw new LinkedApiError(
				linkedApiError.type as TLinkedApiErrorType,
				linkedApiError.message,
				responseData,
			);
		}

		throw new NodeApiError(this.executeFunctions.getNode(), (error ?? {}) as JsonObject, {
			message: 'Request to Linked API failed.',
		});
	}

	public async get<T>(url: string): Promise<TLinkedApiResponse<T>> {
		try {
			const response = await this.executeFunctions.helpers.httpRequest({
				method: 'GET',
				url: `${this.baseUrl}${url}`,
				headers: this.headers,
			});
			return response;
		} catch (error) {
			this.handleError(error);
		}
	}
	public async post<T>(
		url: string,
		data?: FormData | GenericValue | GenericValue[] | Buffer | URLSearchParams,
	): Promise<TLinkedApiResponse<T>> {
		try {
			const response = await this.executeFunctions.helpers.httpRequest({
				method: 'POST',
				url: `${this.baseUrl}${url}`,
				headers: this.headers,
				json: true,
				body: data,
			});
			return response;
		} catch (error) {
			this.handleError(error);
		}
	}
}
