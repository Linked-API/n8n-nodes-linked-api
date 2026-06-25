import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AdminLinkedApiOperation } from '../../shared/AdminOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class AdminGetSubscriptionPricing extends AdminLinkedApiOperation {
	operationName = AVAILABLE_ACTION.adminGetSubscriptionPricing;
	endpoint = 'subscription.getPricing';
	fields: INodeProperties[] = [];
	requestBody = (_: IExecuteFunctions): Record<string, any> | undefined => undefined;
}
