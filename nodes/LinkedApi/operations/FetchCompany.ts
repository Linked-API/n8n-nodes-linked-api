import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import LinkedApi, { TFetchCompanyParams } from '../linkedapi-node';
import IOperation from '../utils/IOperation';

export class FetchCompanyOperation extends IOperation<TFetchCompanyParams> {
	override async buildParams(
		functions: IExecuteFunctions,
		itemIndex: number,
	): Promise<TFetchCompanyParams> {
		const companyUrl = functions.getNodeParameter('companyUrl', itemIndex) as string;
		const retrieveEmployees = functions.getNodeParameter('retrieveEmployees', itemIndex) as
			| boolean
			| undefined;
		const retrieveDMs = functions.getNodeParameter('retrieveDMs', itemIndex) as boolean | undefined;
		const retrievePosts = functions.getNodeParameter('retrievePosts', itemIndex) as
			| boolean
			| undefined;

		const fetchCompanyParams: TFetchCompanyParams = {
			companyUrl,
		};

		if (retrieveEmployees) {
			const employeesLimit = functions.getNodeParameter('employeesLimit', itemIndex) as
				| number
				| undefined;
			fetchCompanyParams.retrieveEmployees = true;
			const employeesConfig: any = {};
			if (employeesLimit) {
				employeesConfig.limit = employeesLimit;
			}
			if (employeesLimit) {
				fetchCompanyParams.employeesRetrievalConfig = employeesConfig;
			}
		}
		if (retrieveDMs) {
			const dmsLimit = functions.getNodeParameter('dmsLimit', itemIndex) as number | undefined;
			fetchCompanyParams.retrieveDMs = true;
			const dmsConfig: any = {};
			if (dmsLimit) {
				dmsConfig.limit = dmsLimit;
			}
			if (dmsLimit) {
				fetchCompanyParams.dmsRetrievalConfig = dmsConfig;
			}
		}
		if (retrievePosts) {
			const postsLimit = functions.getNodeParameter('postsLimit', itemIndex) as number | undefined;
			const postsSince = functions.getNodeParameter('postsSince', itemIndex) as string | undefined;
			fetchCompanyParams.retrievePosts = true;
			const postsConfig: any = {};
			if (postsLimit) {
				postsConfig.limit = postsLimit;
			}
			if (postsSince) {
				postsConfig.since = new Date(postsSince).toISOString();
			}
			if (postsLimit || postsSince) {
				fetchCompanyParams.postsRetrievalConfig = postsConfig;
			}
		}

		return fetchCompanyParams;
	}

	override async execute(linkedapi: LinkedApi, params: TFetchCompanyParams): Promise<IDataObject> {
		const companyWorkflow = await linkedapi.fetchCompany(params);
		const result = await companyWorkflow.result();
		return { result };
	}
}

export const fetchCompanyFields: INodeProperties[] = [
	{
		displayName: 'Company URL',
		name: 'companyUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchCompany'],
			},
		},
		default: '',
		placeholder: 'https://www.linkedin.com/company/microsoft',
		description: 'The LinkedIn company page URL to fetch',
	},
	{
		displayName: 'Retrieve Employees',
		name: 'retrieveEmployees',
		type: 'boolean',
		default: false,
		description: 'Whether to retrieve company employees',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchCompany'],
			},
		},
	},
	{
		displayName: 'Employees Limit',
		name: 'employeesLimit',
		type: 'number',
		default: 25,
		typeOptions: {
			minValue: 1,
			maxValue: 500,
		},
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchCompany'],
				retrieveEmployees: [true],
			},
		},
		description: 'Number of employees to retrieve (max 500)',
	},
	{
		displayName: 'Retrieve Decision Makers',
		name: 'retrieveDMs',
		type: 'boolean',
		default: false,
		description: 'Whether to retrieve company DMs',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchCompany'],
			},
		},
	},
	{
		displayName: 'Decision Makers Limit',
		name: 'dmsLimit',
		type: 'number',
		default: 10,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchCompany'],
				retrieveDMs: [true],
			},
		},
		description: 'Number of decision makers to retrieve (max 20)',
	},
	{
		displayName: 'Retrieve Posts',
		name: 'retrievePosts',
		type: 'boolean',
		default: false,
		description: 'Whether to retrieve company posts',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchCompany'],
			},
		},
	},
	{
		displayName: 'Posts Limit',
		name: 'postsLimit',
		type: 'number',
		default: 10,
		typeOptions: {
			minValue: 1,
			maxValue: 20,
		},
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchCompany'],
				retrievePosts: [true],
			},
		},
		description: 'Number of posts to retrieve (max 20)',
	},
	{
		displayName: 'Posts Since',
		name: 'postsSince',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['fetchCompany'],
				retrievePosts: [true],
			},
		},
		description: 'Filter posts published after this date',
	},
];
