import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AdminLinkedApiOperation } from '../../shared/AdminOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class AdminGetBillingLink extends AdminLinkedApiOperation {
	operationName = AVAILABLE_ACTION.adminGetBillingLink;
	endpoint = 'subscription.getBillingLink';
	fields: INodeProperties[] = [];
	requestBody = (_: IExecuteFunctions): Record<string, any> | undefined => undefined;
}
