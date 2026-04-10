import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AdminLinkedApiOperation } from '../../shared/AdminOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class AdminGetAccounts extends AdminLinkedApiOperation {
	operationName = AVAILABLE_ACTION.adminGetAccounts;
	endpoint = 'accounts.getAll';
	fields: INodeProperties[] = [];
	requestBody = (_: IExecuteFunctions): Record<string, any> | undefined => undefined;
}
