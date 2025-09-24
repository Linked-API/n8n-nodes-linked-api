import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { createParameterWithDisplayOptions } from '../shared/SharedParameters';
import { LinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';

const startDateParameter: INodeProperties = {
	displayName: 'Start Date',
	name: 'startDate',
	type: 'dateTime',
	required: true,
	default: '',
	description: 'Start date for the statistics period (ISO 8601 format)',
	placeholder: '2024-01-01T08:00:00Z',
};

const endDateParameter: INodeProperties = {
	displayName: 'End Date',
	name: 'endDate',
	type: 'dateTime',
	required: true,
	default: '',
	description: 'End date for the statistics period (ISO 8601 format)',
	placeholder: '2024-01-01T11:00:00Z',
};

export class ActionsUsageStatistics extends LinkedApiOperation {
	operationName = AVAILABLE_ACTION.actionsUsageStatistics;
	resource = 'other' as const;
	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(startDateParameter, this.show),
		createParameterWithDisplayOptions(endDateParameter, this.show),
	];
	url = (_: IExecuteFunctions): string => '/stats/actions';
	method = 'GET' as const;
	qs = (context: IExecuteFunctions): Record<string, any> => {
		return {
			start: this.stringParameter(context, 'startDate'),
			end: this.stringParameter(context, 'endDate'),
		};
	};
	requestBody = (_: IExecuteFunctions): Record<string, any> | undefined => {
		return undefined;
	};
}
