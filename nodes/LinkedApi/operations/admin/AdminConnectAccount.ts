import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AdminLinkedApiOperation } from '../../shared/AdminOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class AdminConnectAccount extends AdminLinkedApiOperation {
	operationName = AVAILABLE_ACTION.adminConnectAccount;
	endpoint = 'accounts.createConnectionSession';
	fields: INodeProperties[] = [];
	requestBody = (_: IExecuteFunctions): Record<string, any> | undefined => undefined;
}
