import type {
	IExecuteFunctions as TExecuteFunctions,
	INodeProperties as TNodeProperties,
} from 'n8n-workflow';
import { LinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';
import { SIGNAL_PARAMETERS } from '../shared/SignalParameters';
import { createParameterWithDisplayOptions } from '../shared/SharedParameters';

export class GetSignals extends LinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.getSignals;
	public readonly resource = 'other' as const;
	public readonly method = 'GET' as const;
	public readonly fields: Array<TNodeProperties> = [
		createParameterWithDisplayOptions(
			{
				...SIGNAL_PARAMETERS.type,
				default: '',
				options: [{ name: 'All', value: '' }, ...SIGNAL_PARAMETERS.type.options],
			},
			this.show,
		),
		createParameterWithDisplayOptions(SIGNAL_PARAMETERS.status, this.show),
	];

	public override qs = (context: TExecuteFunctions): Record<string, string> => {
		const type = this.stringParameter(context, 'type');
		const status = this.stringParameter(context, 'status');
		return { ...(type ? { type } : {}), ...(status ? { status } : {}) };
	};

	public url(): string {
		return '/signals';
	}

	public requestBody(): undefined {
		return undefined;
	}
}
