import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	personUrlParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class EndorsePersonSkill extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.endorsePersonSkill;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(personUrlParameter, this.show),
		{
			displayName: 'Skill Name',
			name: 'skillName',
			type: 'string',
			required: true,
			default: '',
			displayOptions: { show: this.show },
			placeholder: 'Project Management',
			description:
				"Name of the skill to endorse, up to 200 characters. Works only for your 1st-degree connections. It must equal the skill's name on the person's profile; letter case and extra spaces are ignored. It is not a pattern. Skill names are shown in the profile owner's language, whatever your own LinkedIn language: a German profile lists Projektmanagement, not Project Management. A skill you have already endorsed is left as it is and counts as a success. Every successful endorsement counts toward the stEndorsements limit.",
		},
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		return {
			personUrl: this.stringParameter(context, 'personUrl'),
			skillName: this.stringParameter(context, 'skillName'),
		};
	}
}
