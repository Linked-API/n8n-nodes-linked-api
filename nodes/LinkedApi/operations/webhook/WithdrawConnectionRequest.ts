import type { IExecuteFunctions } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	personUrlParameter,
	unfollowParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class WithdrawConnectionRequest extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.withdrawConnectionRequest;

	fields = [
		createParameterWithDisplayOptions(personUrlParameter, this.show),
		createParameterWithDisplayOptions(unfollowParameter, this.show),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		return {
			personUrl: this.stringParameter(context, 'personUrl'),
			unfollow: this.booleanParameter(context, 'unfollow'),
		};
	}
}
