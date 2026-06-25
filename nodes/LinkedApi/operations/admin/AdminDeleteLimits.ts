import { IExecuteFunctions, INodeProperties, NodeOperationError } from 'n8n-workflow';
import { createParameterWithDisplayOptions } from '../../shared/SharedParameters';
import { AdminLinkedApiOperation } from '../../shared/AdminOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class AdminDeleteLimits extends AdminLinkedApiOperation {
	operationName = AVAILABLE_ACTION.adminDeleteLimits;
	endpoint = 'limits.delete';
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
		createParameterWithDisplayOptions(
			{
				displayName: 'Limits',
				name: 'limits',
				type: 'json',
				required: true,
				default: '[{"category": "stMessages", "period": "daily"}]',
				description:
					'JSON array of limit keys to delete. Each entry: { category, period (daily/weekly/monthly) }.',
			},
			this.show,
		),
	];
	requestBody = (context: IExecuteFunctions): Record<string, any> => {
		const limitsString = this.stringParameter(context, 'limits');
		let limits: unknown;
		try {
			limits = JSON.parse(limitsString);
		} catch {
			throw new NodeOperationError(
				context.getNode(),
				`Invalid JSON format for limits: ${limitsString}`,
				{ itemIndex: this.itemIndex },
			);
		}
		if (!Array.isArray(limits)) {
			throw new NodeOperationError(context.getNode(), 'Limits must be a JSON array', {
				itemIndex: this.itemIndex,
			});
		}
		return {
			accountId: this.stringParameter(context, 'accountId'),
			limits,
		};
	};
}
