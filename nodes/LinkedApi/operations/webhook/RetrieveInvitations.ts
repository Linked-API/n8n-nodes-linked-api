import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class RetrieveInvitations extends StandardLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.retrieveInvitations;

	protected readonly fields: Array<INodeProperties> = [];

	public body(_: IExecuteFunctions): Record<string, never> {
		return {};
	}
}
