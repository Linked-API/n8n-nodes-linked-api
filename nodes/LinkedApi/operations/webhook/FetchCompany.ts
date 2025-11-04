import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	companyUrlParameter,
	employeeLimitParameter,
	dmsLimitParameter,
	postsLimitParameter,
	postsSinceParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class FetchCompany extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.fetchCompany;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(companyUrlParameter, this.show),
		{
			displayName: 'Additional Data to Retrieve',
			name: 'dataToRetrieve',
			type: 'multiOptions',
			default: [],
			displayOptions: {
				show: this.show,
			},
			description: 'Select the additional data to include with the company details',
			options: [
				{ name: 'Decision Makers', value: 'decisionMakers' },
				{ name: 'Employees', value: 'employees' },
				{ name: 'Posts', value: 'posts' },
			],
		},
		createParameterWithDisplayOptions(employeeLimitParameter, {
			...this.show,
			dataToRetrieve: ['employees'],
		}),
		createParameterWithDisplayOptions(dmsLimitParameter, {
			...this.show,
			dataToRetrieve: ['decisionMakers'],
		}),
		createParameterWithDisplayOptions(postsLimitParameter, {
			...this.show,
			dataToRetrieve: ['posts'],
		}),
		createParameterWithDisplayOptions(postsSinceParameter, {
			...this.show,
			dataToRetrieve: ['posts'],
		}),
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const dataToRetrieve = context.getNodeParameter('dataToRetrieve', 0, []) as string[];
		const retrieveEmployees = dataToRetrieve.includes('employees');
		const retrieveDMs = dataToRetrieve.includes('decisionMakers');
		const retrievePosts = dataToRetrieve.includes('posts');

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
