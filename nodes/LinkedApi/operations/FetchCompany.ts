import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	companyUrlParameter,
	employeeLimitParameter,
	dmsLimitParameter,
	postsLimitParameter,
	postsSinceParameter,
} from '../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../shared/AvailableActions';

export class FetchCompany extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.fetchCompany;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(companyUrlParameter, this.show),
		// Employees
		{
			displayName: 'Retrieve Employees',
			name: 'retrieveEmployees',
			type: 'boolean',
			default: false,
			description: 'Whether to retrieve company employees',
			displayOptions: {
				show: this.show,
			},
		},
		createParameterWithDisplayOptions(employeeLimitParameter, {
			...this.show,
			retrieveEmployees: [true],
		}),
		// Decision Makers
		{
			displayName: 'Retrieve Decision Makers',
			name: 'retrieveDMs',
			type: 'boolean',
			default: false,
			description: 'Whether to retrieve company decision makers',
			displayOptions: {
				show: this.show,
			},
		},
		createParameterWithDisplayOptions(dmsLimitParameter, {
			...this.show,
			retrieveDMs: [true],
		}),
		// Posts
		{
			displayName: 'Retrieve Posts',
			name: 'retrievePosts',
			type: 'boolean',
			default: false,
			description: 'Whether to retrieve company posts',
			displayOptions: {
				show: this.show,
			},
		},
		createParameterWithDisplayOptions(postsLimitParameter, {
			...this.show,
			retrievePosts: [true],
		}),
		createParameterWithDisplayOptions(postsSinceParameter, {
			...this.show,
			retrievePosts: [true],
		}),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const retrieveEmployees = this.booleanParameter(context, 'retrieveEmployees');
		const retrieveDMs = this.booleanParameter(context, 'retrieveDMs');
		const retrievePosts = this.booleanParameter(context, 'retrievePosts');

		let body: Record<string, any> = {
			companyUrl: this.stringParameter(context, 'companyUrl'),
			retrieveEmployees,
			retrieveDMs,
			retrievePosts,
		};

		if (retrieveEmployees) {
			body.employeesRetrievalConfig = {
				limit: this.numberParameter(context, 'employeeLimit'),
			};
		}

		if (retrieveDMs) {
			body.dmsRetrievalConfig = {
				limit: this.numberParameter(context, 'dmsLimit'),
			};
		}

		if (retrievePosts) {
			body.postsRetrievalConfig = {
				limit: this.numberParameter(context, 'postsLimit'),
				since: this.stringParameter(context, 'postsSince') || undefined,
			};	
		}

		return body;
	}
}
