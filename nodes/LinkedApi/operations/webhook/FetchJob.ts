import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { createParameterWithDisplayOptions, jobUrlParameter } from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class FetchJob extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.fetchJob;

	fields: INodeProperties[] = [createParameterWithDisplayOptions(jobUrlParameter, this.show)];

	public body(context: IExecuteFunctions): Record<string, any> {
		return {
			jobUrl: this.stringParameter(context, 'jobUrl'),
		};
	}
}
