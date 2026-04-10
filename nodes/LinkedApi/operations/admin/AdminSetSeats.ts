import { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { createParameterWithDisplayOptions } from '../../shared/SharedParameters';
import { AdminLinkedApiOperation } from '../../shared/AdminOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class AdminSetSeats extends AdminLinkedApiOperation {
	operationName = AVAILABLE_ACTION.adminSetSeats;
	endpoint = 'subscription.setSeats';
	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(
			{
				displayName: 'Quantity',
				name: 'quantity',
				type: 'number',
				required: true,
				default: 1,
				description: 'Number of seats (1-1000)',
				typeOptions: { minValue: 1, maxValue: 1000 },
			},
			this.show,
		),
		createParameterWithDisplayOptions(
			{
				displayName: 'Seat Type',
				name: 'seatType',
				type: 'options',
				required: true,
				default: 'core',
				options: [
					{ name: 'Core', value: 'core' },
					{ name: 'Plus', value: 'plus' },
				],
				description: 'Seat type. "Plus" unlocks Sales Navigator actions.',
			},
			this.show,
		),
		createParameterWithDisplayOptions(
			{
				displayName: 'Billing Period',
				name: 'billingPeriod',
				type: 'options',
				required: true,
				default: 'month',
				options: [
					{ name: 'Month', value: 'month' },
					{ name: 'Year', value: 'year' },
				],
				description: 'Billing period',
			},
			this.show,
		),
	];
	requestBody = (context: IExecuteFunctions): Record<string, any> => ({
		quantity: this.numberParameter(context, 'quantity'),
		seatType: this.stringParameter(context, 'seatType'),
		billingPeriod: this.stringParameter(context, 'billingPeriod'),
	});
}
