import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AdminLinkedApiOperation } from '../../shared/AdminOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class AdminGetSubscriptionStatus extends AdminLinkedApiOperation {
	operationName = AVAILABLE_ACTION.adminGetSubscriptionStatus;
	endpoint = 'subscription.getStatus';
	fields: INodeProperties[] = [];
	requestBody = (_: IExecuteFunctions): Record<string, any> | undefined => undefined;
}
