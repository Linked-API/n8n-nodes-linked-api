import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	workflowIdParameter,
	workflowOperationParameter,
} from '../shared/SharedParameters';
import { LinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';

export class GetWorkflowResult extends LinkedApiOperation {
	operationName = AVAILABLE_ACTION.getWorkflowResult;
	resource = 'other' as const;
	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(workflowIdParameter, this.show),
		createParameterWithDisplayOptions(workflowOperationParameter, this.show),
	];
	url = (context: IExecuteFunctions): string =>
		`/workflows/${this.stringParameter(context, 'workflowId')}`;
	method = 'GET' as const;
	qs = (context: IExecuteFunctions): Record<string, any> => {
		return {
			operationName: this.stringParameter(context, 'workflowOperation'),
		};
	};
	requestBody(_: IExecuteFunctions): Record<string, any> | undefined {
		return undefined;
	}
}
