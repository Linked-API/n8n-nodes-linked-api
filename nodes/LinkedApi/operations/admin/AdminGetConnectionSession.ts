import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { createParameterWithDisplayOptions } from '../../shared/SharedParameters';
import { AdminLinkedApiOperation } from '../../shared/AdminOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class AdminGetConnectionSession extends AdminLinkedApiOperation {
	operationName = AVAILABLE_ACTION.adminGetConnectionSession;
	endpoint = 'accounts.getConnectionSession';
	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(
			{
				displayName: 'Session ID',
				name: 'sessionId',
				type: 'string',
				required: true,
				default: '',
				description: 'Connection or reconnection session UUID',
			},
			this.show,
		),
	];
	requestBody = (context: IExecuteFunctions): Record<string, any> => ({
		sessionId: this.stringParameter(context, 'sessionId'),
	});
}
