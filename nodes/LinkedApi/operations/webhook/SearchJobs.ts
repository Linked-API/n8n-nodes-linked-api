/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-multi-options-type-unsorted-items */
import type { IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import {
	createParameterWithDisplayOptions,
	searchTermParameter,
	limitParameter,
	customSearchUrlParameter,
} from '../../shared/SharedParameters';
import { StandardLinkedApiOperation } from '../../shared/LinkedApiOperation';
import { AVAILABLE_ACTION } from '../../shared/AvailableActions';

export class SearchJobs extends StandardLinkedApiOperation {
	operationName = AVAILABLE_ACTION.searchJobs;

	fields: INodeProperties[] = [
		createParameterWithDisplayOptions(
			{ ...searchTermParameter, placeholder: 'product manager' },
			this.show,
		),
		createParameterWithDisplayOptions(limitParameter, this.show),
		{
			displayName: 'Advanced Filter',
			name: 'advancedFilter',
			type: 'collection',
			placeholder: 'Add Field',
			default: {},
			displayOptions: {
				show: this.show,
			},
			options: [
				{
					...customSearchUrlParameter,
					placeholder: 'https://www.linkedin.com/jobs/search/?keywords=product%20manager',
				},
				{
					displayName: 'Location',
					name: 'location',
					type: 'string',
					default: '',
					placeholder: 'San Francisco, California, United States',
					description: 'Free-form location to filter by',
				},
				{
					displayName: 'Date Posted',
					name: 'datePosted',
					type: 'options',
					default: 'anyTime',
					description: 'Filter by when the job was posted',
					options: [
						{ name: 'Any Time', value: 'anyTime' },
						{ name: 'Past 24 Hours', value: 'past24Hours' },
						{ name: 'Past Week', value: 'pastWeek' },
						{ name: 'Past Month', value: 'pastMonth' },
					],
				},
				{
					displayName: 'Experience Levels',
					name: 'experienceLevels',
					type: 'multiOptions',
					default: [],
					description: 'Filter by experience level',
					options: [
						{ name: 'Internship', value: 'internship' },
						{ name: 'Entry Level', value: 'entryLevel' },
						{ name: 'Associate', value: 'associate' },
						{ name: 'Mid-Senior Level', value: 'midSeniorLevel' },
						{ name: 'Director', value: 'director' },
						{ name: 'Executive', value: 'executive' },
					],
				},
				{
					displayName: 'Employment Types',
					name: 'employmentTypes',
					type: 'multiOptions',
					default: [],
					description: 'Filter by employment type',
					options: [
						{ name: 'Full Time', value: 'fullTime' },
						{ name: 'Part Time', value: 'partTime' },
						{ name: 'Contract', value: 'contract' },
						{ name: 'Temporary', value: 'temporary' },
						{ name: 'Volunteer', value: 'volunteer' },
						{ name: 'Internship', value: 'internship' },
						{ name: 'Other', value: 'other' },
					],
				},
				{
					displayName: 'Workplace Types',
					name: 'workplaceTypes',
					type: 'multiOptions',
					default: [],
					description: 'Filter by workplace type',
					options: [
						{ name: 'On-Site', value: 'onSite' },
						{ name: 'Remote', value: 'remote' },
						{ name: 'Hybrid', value: 'hybrid' },
					],
				},
				{
					displayName: 'Companies',
					name: 'companies',
					type: 'string',
					default: '',
					placeholder: 'Google; Microsoft',
					description: 'Company names separated by semicolons',
				},
				{
					displayName: 'Industries',
					name: 'industries',
					type: 'string',
					default: '',
					placeholder: 'Software Development; Technology',
					description: 'Industries separated by semicolons',
				},
				{
					displayName: 'Job Functions',
					name: 'jobFunctions',
					type: 'string',
					default: '',
					placeholder: 'Engineering; Product Management',
					description: 'Job functions separated by semicolons',
				},
				{
					displayName: 'Easy Apply',
					name: 'easyApply',
					type: 'boolean',
					default: false,
					description: 'Whether to only return jobs with Easy Apply',
				},
				{
					displayName: 'Has Verifications',
					name: 'hasVerifications',
					type: 'boolean',
					default: false,
					description: 'Whether to only return jobs with verification signals',
				},
				{
					displayName: 'Under 10 Applicants',
					name: 'under10Applicants',
					type: 'boolean',
					default: false,
					description: 'Whether to only return jobs with fewer than 10 applicants',
				},
				{
					displayName: 'In Your Network',
					name: 'inYourNetwork',
					type: 'boolean',
					default: false,
					description: 'Whether to only return jobs from your network',
				},
				{
					displayName: 'Fair Chance Employer',
					name: 'fairChanceEmployer',
					type: 'boolean',
					default: false,
					description: 'Whether to only return fair chance employer jobs',
				},
			],
		},
	];

	public body(context: IExecuteFunctions): Record<string, any> {
		const filter: Record<string, any> = {};
		const advancedFilter = context.getNodeParameter('advancedFilter', this.itemIndex, {}) as {
			customSearchUrl?: string;
			location?: string;
			datePosted?: string;
			experienceLevels?: string[];
			employmentTypes?: string[];
			workplaceTypes?: string[];
			companies?: string;
			industries?: string;
			jobFunctions?: string;
			easyApply?: boolean;
			hasVerifications?: boolean;
			under10Applicants?: boolean;
			inYourNetwork?: boolean;
			fairChanceEmployer?: boolean;
		};

		const {
			location,
			datePosted,
			experienceLevels,
			employmentTypes,
			workplaceTypes,
			companies,
			industries,
			jobFunctions,
			easyApply,
			hasVerifications,
			under10Applicants,
			inYourNetwork,
			fairChanceEmployer,
		} = advancedFilter;

		if (location) filter.location = location;
		if (datePosted) filter.datePosted = datePosted;
		if (experienceLevels && experienceLevels.length > 0) filter.experienceLevels = experienceLevels;
		if (employmentTypes && employmentTypes.length > 0) filter.employmentTypes = employmentTypes;
		if (workplaceTypes && workplaceTypes.length > 0) filter.workplaceTypes = workplaceTypes;
		if (companies) {
			filter.companies = companies
				.split(';')
				.map((s) => s.trim())
				.filter((s) => s);
		}
		if (industries) {
			filter.industries = industries
				.split(';')
				.map((s) => s.trim())
				.filter((s) => s);
		}
		if (jobFunctions) {
			filter.jobFunctions = jobFunctions
				.split(';')
				.map((s) => s.trim())
				.filter((s) => s);
		}
		if (easyApply) filter.easyApply = true;
		if (hasVerifications) filter.hasVerifications = true;
		if (under10Applicants) filter.under10Applicants = true;
		if (inYourNetwork) filter.inYourNetwork = true;
		if (fairChanceEmployer) filter.fairChanceEmployer = true;

		return {
			term: this.stringParameter(context, 'searchTerm') || undefined,
			limit: this.numberParameter(context, 'limit'),
			customSearchUrl: advancedFilter.customSearchUrl || undefined,
			filter,
		};
	}
}
