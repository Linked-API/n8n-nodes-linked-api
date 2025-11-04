import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { createParameterWithDisplayOptions, workflowIdParameter } from '../shared/SharedParameters';
import { LinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';

export class CancelWorkflow extends LinkedApiOperation {
	operationName = AVAILABLE_ACTION.cancelWorkflow;
	resource = 'other' as const;
	fields: INodeProperties[] = [createParameterWithDisplayOptions(workflowIdParameter, this.show)];
	url = (context: IExecuteFunctions): string =>
		`/workflows/${this.stringParameter(context, 'workflowId')}`;
	method = 'DELETE' as const;
	qs = (_: IExecuteFunctions): Record<string, any> | undefined => {
		return undefined;
	};
	requestBody = (_: IExecuteFunctions): Record<string, any> | undefined => {
		return undefined;
	};
}
