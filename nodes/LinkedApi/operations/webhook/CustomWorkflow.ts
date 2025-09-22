import type { IExecuteFunctions } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	workflowDefinitionParameter,
} from '../../shared/SharedParameters';
import { OtherLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class CustomWorkflow extends OtherLinkedApiOperation {
	operationName = AVAILABLE_ACTION.customWorkflow;

	fields = [createParameterWithDisplayOptions(workflowDefinitionParameter, this.show)];

	public body(context: IExecuteFunctions): Record<string, any> {
		return {
			workflowDefinition: JSON.parse(this.stringParameter(context, 'workflowDefinition')),
		};
	}
}
