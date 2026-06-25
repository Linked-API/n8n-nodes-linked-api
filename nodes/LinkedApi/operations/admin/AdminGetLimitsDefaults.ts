import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AdminLinkedApiOperation } from '../../shared/AdminOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class AdminGetLimitsDefaults extends AdminLinkedApiOperation {
	operationName = AVAILABLE_ACTION.adminGetLimitsDefaults;
	endpoint = 'limits.getDefaults';
	fields: INodeProperties[] = [];
	requestBody = (_: IExecuteFunctions): Record<string, any> | undefined => undefined;
}
