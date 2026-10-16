import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	personUrlParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class EndorsePersonSkills extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.endorsePersonSkills;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(personUrlParameter, this.show),
		{
			displayName: 'Skill Name Patterns',
			name: 'skillNamePatterns',
			type: 'string',
			typeOptions: {
				multipleValues: true,
				multipleValueButtonText: 'Add Pattern',
			},
			default: [],
			displayOptions: { show: this.show },
			placeholder: 'project\\s*manage',
			description:
				"Regular expressions that select skills by name; a skill is selected when any of them matches. Leave empty to endorse every skill of the person. The syntax is RE2: lookaround and backreferences are not supported. Matching is case-insensitive and searches anywhere in the name: manage matches Project Management. Anchor a pattern with ^…$ to require the whole name: ^scrum$ matches Scrum but not Scrum Master. Up to 20 patterns of up to 200 characters each. Skill names are shown in the profile owner's language, whatever your own LinkedIn language, so write patterns in the language of the profiles you target. Works only for your 1st-degree connections. A skill you have already endorsed counts as a success, and every successful endorsement counts toward the stEndorsements limit.",
		},
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const skillNamePatterns = (
			context.getNodeParameter('skillNamePatterns', this.itemIndex, []) as string[]
		).filter((pattern) => pattern !== '');

		const body: Record<string, any> = {
			personUrl: this.stringParameter(context, 'personUrl'),
		};

		// Core rejects an empty array; omitting the field is how every skill is endorsed.
		if (skillNamePatterns.length > 0) {
			body.skillNamePatterns = skillNamePatterns;
		}

		return body;
	}
}
