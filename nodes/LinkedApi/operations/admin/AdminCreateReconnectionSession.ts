import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { createParameterWithDisplayOptions } from '../../shared/SharedParameters';
import { AdminLinkedApiOperation } from '../../shared/AdminOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class AdminCreateReconnectionSession extends AdminLinkedApiOperation {
	operationName = AVAILABLE_ACTION.adminCreateReconnectionSession;
	endpoint = 'accounts.createReconnectionSession';
	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(
			{
				displayName: 'Account ID',
				name: 'accountId',
				type: 'string',
				required: true,
				default: '',
				description: 'UUID of the account to reconnect',
			},
			this.show,
		),
	];
	requestBody = (context: IExecuteFunctions): Record<string, any> => ({
		accountId: this.stringParameter(context, 'accountId'),
	});
}
