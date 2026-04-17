import { IExecuteFunctions, INodeProperties, NodeOperationError } from 'n8n-workflow';
import { createParameterWithDisplayOptions } from '../../shared/SharedParameters';
import { AdminLinkedApiOperation } from '../../shared/AdminOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class AdminSetLimits extends AdminLinkedApiOperation {
	operationName = AVAILABLE_ACTION.adminSetLimits;
	endpoint = 'limits.set';
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
				default:
					'[{"category": "stMessages", "period": "daily", "maxValue": 25, "isEnabled": true}]',
				description:
					'JSON array of limit configurations. Each entry: { category, period (daily/weekly/monthly), maxValue, isEnabled? }. Categories: stPersonProfileViews, stCompanyPageViews, stConnectionRequests, stMessages, stSearchQueries, stReactions, stComments, stPosts, nvPersonProfileViews, nvCompanyPageViews, nvMessages.',
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
