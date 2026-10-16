import { IExecuteFunctions, INodeProperties, NodeOperationError } from 'n8n-workflow';
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
			displayName: 'Endorse All Skills',
			name: 'endorseAllSkills',
			type: 'boolean',
			default: false,
			displayOptions: { show: this.show },
			description:
				'Whether to endorse every skill of the person instead of only the skills matching your patterns',
		},
		{
			displayName: 'Skill Name Patterns',
			name: 'skillNamePatterns',
			type: 'string',
			typeOptions: {
				multipleValues: true,
				multipleValueButtonText: 'Add Pattern',
			},
			required: true,
			default: [],
			displayOptions: { show: { ...this.show, endorseAllSkills: [false] } },
			placeholder: 'project\\s*manage',
			description:
				"Regular expressions that select skills by name; a skill is selected when any of them matches. At least one is required: to endorse every skill, turn on Endorse All Skills instead. The syntax is RE2: lookaround and backreferences are not supported. Matching is case-insensitive and searches anywhere in the name: manage matches Project Management. Anchor a pattern with ^…$ to require the whole name: ^scrum$ matches Scrum but not Scrum Master. Up to 20 patterns of up to 200 characters each; leading and trailing spaces are ignored. Skill names are shown in the profile owner's language, whatever your own LinkedIn language, so write patterns in the language of the profiles you target. Works only for your 1st-degree connections. A skill you have already endorsed counts as a success, and every successful endorsement counts toward the stEndorsements limit.",
		},
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const body: Record<string, any> = {
			personUrl: this.stringParameter(context, 'personUrl'),
		};

		// Only a real true endorses everything: an expression resolving to the text "FALSE" is truthy.
		if (context.getNodeParameter('endorseAllSkills', this.itemIndex) === true) {
			return body;
		}

		const rows = context.getNodeParameter('skillNamePatterns', this.itemIndex, []) as unknown[];
		const skillNamePatterns: string[] = [];

		for (const [index, row] of rows.entries()) {
			if (row === null || row === undefined) {
				continue;
			}

			// String() would turn a mapped object into "[object Object]", a valid RE2 character class
			// that selects most skills.
			if (typeof row !== 'string') {
				throw new NodeOperationError(
					context.getNode(),
					`Skill name pattern ${index + 1} is not text. Map the skill name text, not a whole item or list.`,
					{ itemIndex: this.itemIndex },
				);
			}

			const pattern = row.trim();

			if (pattern !== '') {
				skillNamePatterns.push(pattern);
			}
		}

		// An omitted skillNamePatterns endorses every skill, which cannot be undone; a blank row or an
		// expression that resolved to nothing must fail instead of silently widening to all skills.
		if (skillNamePatterns.length === 0) {
			throw new NodeOperationError(
				context.getNode(),
				'Add at least one skill name pattern, or turn on "Endorse All Skills" to endorse every skill',
				{ itemIndex: this.itemIndex },
			);
		}

		body.skillNamePatterns = skillNamePatterns;

		return body;
	}
}
