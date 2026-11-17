import type {
	IExecuteFunctions as TExecuteFunctions,
	INodeProperties as TNodeProperties,
} from 'n8n-workflow';
import { LinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';
import { SIGNAL_PARAMETERS } from '../shared/SignalParameters';
import { createParameterWithDisplayOptions } from '../shared/SharedParameters';

export class PollSignals extends LinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.pollSignals;
	public readonly resource = 'other' as const;
	public readonly method = 'POST' as const;
	public readonly fields: Array<TNodeProperties> = [
		createParameterWithDisplayOptions(
			{
				displayName: 'Since',
				name: 'since',
				type: 'dateTime',
				default: '',
				description:
					'Pass the newest detectedAt you have to fetch only later events. If empty, all retained events are returned and the response can be large.',
			},
			this.show,
		),
		createParameterWithDisplayOptions({ ...SIGNAL_PARAMETERS.id, required: undefined }, this.show),
		createParameterWithDisplayOptions(
			{
				...SIGNAL_PARAMETERS.type,
				name: 'signalType',
				default: '',
				options: [{ name: 'All', value: '' }, ...SIGNAL_PARAMETERS.type.options],
			},
			this.show,
		),
		createParameterWithDisplayOptions(SIGNAL_PARAMETERS.eventType, this.show),
	];

	public url(): string {
		return '/signals/poll';
	}

	public requestBody(context: TExecuteFunctions): Record<string, string> {
		const body: Record<string, string> = {};
		for (const key of ['since', 'signalId', 'signalType', 'eventType']) {
			const value = this.stringParameter(context, key);
			if (value) {
				body[key] = value;
			}
		}
		return body;
	}
}
