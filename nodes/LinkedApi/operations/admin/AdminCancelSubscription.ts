import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AdminLinkedApiOperation } from '../../shared/AdminOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class AdminCancelSubscription extends AdminLinkedApiOperation {
	operationName = AVAILABLE_ACTION.adminCancelSubscription;
	endpoint = 'subscription.cancel';
	fields: INodeProperties[] = [];
	requestBody = (_: IExecuteFunctions): Record<string, any> | undefined => undefined;
}
