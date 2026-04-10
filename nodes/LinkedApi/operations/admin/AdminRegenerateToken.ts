import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { createParameterWithDisplayOptions } from '../../shared/SharedParameters';
import { AdminLinkedApiOperation } from '../../shared/AdminOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class AdminRegenerateToken extends AdminLinkedApiOperation {
	operationName = AVAILABLE_ACTION.adminRegenerateToken;
	endpoint = 'accounts.regenerateIdentificationToken';
	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(
			{
				displayName: 'Account ID',
				name: 'accountId',
				type: 'string',
				required: true,
				default: '',
				description: 'UUID of the account',
			},
			this.show,
		),
	];
	requestBody = (context: IExecuteFunctions): Record<string, any> => ({
		accountId: this.stringParameter(context, 'accountId'),
	});
}
