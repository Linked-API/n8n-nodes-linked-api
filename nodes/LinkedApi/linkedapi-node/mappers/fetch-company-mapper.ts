import type { TBaseFetchCompanyParams, TFetchCompanyResult } from '../types/actions/company';
import { ThenWorkflowMapper, type TActionConfig } from './then-workflow-mapper.abstract';

const FETCH_COMPANY_ACTIONS: TActionConfig[] = [
	{
		paramName: 'retrieveEmployees',
		actionType: 'st.retrieveCompanyEmployees',
		configSource: 'employeesRetrievalConfig',
	},
	{
		paramName: 'retrieveDMs',
		actionType: 'st.retrieveCompanyDMs',
		configSource: 'dmsRetrievalConfig',
	},
	{
		paramName: 'retrievePosts',
		actionType: 'st.retrieveCompanyPosts',
		configSource: 'postsRetrievalConfig',
	},
];

const RESPONSE_MAPPINGS = [
	{
		actionType: 'st.retrieveCompanyEmployees',
		targetProperty: 'employees',
	},
	{
		actionType: 'st.retrieveCompanyDMs',
		targetProperty: 'dms',
	},
	{
		actionType: 'st.retrieveCompanyPosts',
		targetProperty: 'posts',
	},
];

export class FetchCompanyMapper<TParams extends TBaseFetchCompanyParams> extends ThenWorkflowMapper<
	TParams,
	TFetchCompanyResult<TParams>
> {
	constructor() {
		super({
			actionConfigs: FETCH_COMPANY_ACTIONS,
			responseMappings: RESPONSE_MAPPINGS,
			baseActionType: 'st.openCompanyPage',
			defaultParams: {
				basicInfo: true,
			},
		});
	}
}
