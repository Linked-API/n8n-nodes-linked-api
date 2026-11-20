import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';
import { SalesNavigatorLinkedApiOperation } from '../../shared/LinkedApiOperation';

const UNSAVE_CHOICE = {
	none: 'none',
	members: 'members',
} as const;

export class NvDeleteList extends SalesNavigatorLinkedApiOperation {
	public readonly operationName = AVAILABLE_ACTION.nvDeleteList;
	protected readonly fields: Array<INodeProperties> = [
		{
			displayName: 'List ID',
			name: 'listId',
			type: 'string',
			default: '',
			description:
				'Owned list ID as a string, never a number. Unknown, shared or deleted IDs return listNotFound; system lists without Delete return listNotDeletable. Plus required. Success has no result data.',
			required: true,
			displayOptions: { show: this.show },
		},
		{
			displayName: 'Members',
			name: 'unsave',
			type: 'options',
			default: 'none',
			description:
				'What happens to the list members. Unsave Members also unsaves them, which removes them from your other lists too.',
			options: [
				{
					name: 'Keep Saved',
					value: UNSAVE_CHOICE.none,
				},
				{
					name: 'Unsave Members',
					value: UNSAVE_CHOICE.members,
				},
			],
			displayOptions: { show: this.show },
		},
	];

	public body(context: IExecuteFunctions): Record<string, unknown> {
		const unsave = this.stringParameter(context, 'unsave');

		return {
			listId: this.stringParameter(context, 'listId'),
			...(unsave === UNSAVE_CHOICE.members ? { unsave } : {}),
		};
	}
}
