import type {
	IExecuteFunctions as TExecuteFunctions,
	INodeProperties as TNodeProperties,
} from 'n8n-workflow';
import { LinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';
import { SIGNAL_PARAMETERS } from '../shared/SignalParameters';
import { createParameterWithDisplayOptions } from '../shared/SharedParameters';

export class PauseSignal extends LinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.pauseSignal;
	public readonly resource = 'other' as const;
	public readonly method = 'POST' as const;
	public readonly fields: Array<TNodeProperties> = [
		createParameterWithDisplayOptions(SIGNAL_PARAMETERS.id, this.show),
	];

	public url(context: TExecuteFunctions): string {
		return `/signals/${encodeURIComponent(this.stringParameter(context, 'signalId'))}/pause`;
	}

	public requestBody(): undefined {
		return undefined;
	}
}
