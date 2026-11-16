import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { RecruiterLiteLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class RcSyncInbox extends RecruiterLiteLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.rcSyncInbox;
	protected readonly fields: Array<INodeProperties> = [];
	public body(context: IExecuteFunctions): Record<string, unknown> {
		return {};
	}
}
