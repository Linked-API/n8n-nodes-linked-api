import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AdminLinkedApiOperation } from '../../shared/AdminOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class AdminGetSeats extends AdminLinkedApiOperation {
	operationName = AVAILABLE_ACTION.adminGetSeats;
	endpoint = 'subscription.getSeats';
	fields: INodeProperties[] = [];
	requestBody = (_: IExecuteFunctions): Record<string, any> | undefined => undefined;
}
