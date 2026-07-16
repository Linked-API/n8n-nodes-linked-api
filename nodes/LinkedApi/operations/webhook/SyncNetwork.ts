import type { IExecuteFunctions } from 'n8n-workflow';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class SyncNetwork extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.syncNetwork;

	fields = [];

	public body(_: IExecuteFunctions): Record<string, any> {
		return {};
	}
}
