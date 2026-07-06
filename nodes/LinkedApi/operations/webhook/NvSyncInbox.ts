import type { IExecuteFunctions } from 'n8n-workflow';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class NvSyncInbox extends SalesNavigatorLinkedApiOperation {
	operationName = AVAILABLE_ACTION.nvSyncInbox;

	fields = [];

	public body(_: IExecuteFunctions): Record<string, any> {
		return {};
	}
}
