import { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import IOperation from '../utils/IOperation';
import LinkedApi, { TSearchCompanyParams, TSearchCompanySize } from '../linkedapi-node';

export class SearchCompaniesOperation extends IOperation<TSearchCompanyParams> {
	override async buildParams(
		functions: IExecuteFunctions,
		itemIndex: number,
	): Promise<TSearchCompanyParams> {
		const searchTerm = functions.getNodeParameter('searchTerm', itemIndex) as string | undefined;
		const limit = functions.getNodeParameter('limit', itemIndex, 10) as number;
		const locationsRaw = functions.getNodeParameter('locations', itemIndex, '') as string;
		const industriesRaw = functions.getNodeParameter('industries', itemIndex, '') as string;
		const sizes = functions.getNodeParameter('sizes', itemIndex, []) as string[];

		const locations = locationsRaw.length > 0 ? locationsRaw.split(';').map((s) => s.trim()) : [];
		const industries =
			industriesRaw.length > 0 ? industriesRaw.split(';').map((s) => s.trim()) : [];

		const searchParams: TSearchCompanyParams = {};

		if (searchTerm) {
			searchParams.term = searchTerm;
		}

		if (limit) {
			searchParams.limit = limit;
		}

		if (locations.length > 0 || industries.length > 0 || sizes.length > 0) {
			searchParams.filter = {};

			if (locations.length > 0) {
				searchParams.filter.locations = locations;
			}
			if (industries.length > 0) {
				searchParams.filter.industries = industries;
			}
			if (sizes.length > 0) {
				searchParams.filter.sizes = sizes.map((s) => s as TSearchCompanySize);
			}
		}

		return searchParams;
	}

	override async execute(linkedapi: LinkedApi, params: TSearchCompanyParams): Promise<IDataObject> {
		const searchWorkflow = await linkedapi.searchCompanies(params);
		const result = await searchWorkflow.result();

		return { result };
	}
}

export const searchCompaniesFields: INodeProperties[] = [
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['searchCompanies'],
			},
		},
		default: '',
		placeholder: 'software development',
		description: 'Search term/keywords for company name or description',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 10,
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['searchCompanies'],
			},
		},
	},
	{
		displayName: 'Locations',
		name: 'locations',
		type: 'string',
		description: 'Filter by company locations',
		default: '',
		placeholder: 'San Francisco; New York',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['searchCompanies'],
			},
		},
	},
	{
		displayName: 'Industries',
		name: 'industries',
		type: 'string',
		description: 'Filter by company industries',
		default: '',
		placeholder: 'Software Development; Marketing',
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['searchCompanies'],
			},
		},
	},
	{
		displayName: 'Company Sizes',
		name: 'sizes',
		type: 'multiOptions',
		description: 'Filter by company size (employee count)',
		default: [],
		// eslint-disable-next-line n8n-nodes-base/node-param-multi-options-type-unsorted-items
		options: [
			{
				name: '1-10',
				value: '1-10',
			},
			{
				name: '11-50',
				value: '11-50',
			},
			{
				name: '51-200',
				value: '51-200',
			},
			{
				name: '201-500',
				value: '201-500',
			},
			{
				name: '501-1000',
				value: '501-1000',
			},
			{
				name: '1001-5000',
				value: '1001-5000',
			},
			{
				name: '5001-10000',
				value: '5001-10000',
			},
			{
				name: '10001+',
				value: '10001+',
			},
		],
		displayOptions: {
			show: {
				resource: ['standard'],
				operation: ['searchCompanies'],
			},
		},
	},
];
