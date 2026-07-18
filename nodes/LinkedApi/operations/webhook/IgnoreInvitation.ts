import { InvitationOperation } from '../../shared/InvitationOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class IgnoreInvitation extends InvitationOperation {
	public readonly operationName = AVAILABLE_ACTION.ignoreInvitation;
}
