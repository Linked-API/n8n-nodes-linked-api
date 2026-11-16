import type { IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
export function buildRcSearchBody(
	context: IExecuteFunctions,
	values: Record<string, unknown>,
): Record<string, unknown> {
	const filter: Record<string, unknown> = {};
	for (const field of [
		'jobTitles',
		'locations',
		'skills',
		'companies',
		'currentCompanies',
		'pastCompanies',
		'schools',
		'industries',
		'firstNames',
		'lastNames',
		'profileLanguages',
		'groups',
		'projects',
		'notes',
		'companySizes',
		'jobFunctions',
		'seniority',
		'recentlyJoined',
		'networkRelationships',
	]) {
		const value = values[field];
		const list =
			typeof value === 'string'
				? value
						.split(';')
						.map((item): string => item.trim())
						.filter(Boolean)
				: value;
		if (Array.isArray(list) && list.length) filter[field] = list;
	}
	for (const field of ['jobTitlesScope', 'companiesScope', 'locationsScope'])
		if (values[field]) filter[field] = values[field];
	for (const field of ['hasPassedSkillAssessment', 'isMilitaryVeteran', 'hidePreviouslyViewed'])
		if (values[field] === true) filter[field] = true;
	for (const field of [
		'postalCode',
		'graduationYears',
		'yearsOfExperience',
		'recruitingActivity',
	]) {
		const value = values[field];
		if (value && typeof value === 'object') {
			const nested = Object.fromEntries(
				Object.entries(value).filter(([, item]): boolean => item !== '' && item !== undefined),
			);
			if (Object.keys(nested).length) filter[field] = nested;
		}
	}
	const term = typeof values.searchTerm === 'string' ? values.searchTerm : '';
	const customSearchUrl = values.customSearchUrl;
	if (customSearchUrl && (term.trim() || Object.keys(filter).length))
		throw new NodeOperationError(
			context.getNode(),
			'Custom search URL cannot be combined with term or filters',
		);
	const hasFilter = Object.entries(filter).some(([key]): boolean => !key.endsWith('Scope'));
	if (!customSearchUrl && !term.trim() && !hasFilter)
		throw new NodeOperationError(
			context.getNode(),
			'Provide a term, a nonempty filter, or a custom search URL',
		);
	return {
		...(customSearchUrl ? { customSearchUrl } : {}),
		...(term.trim() ? { term } : {}),
		...(Object.keys(filter).length ? { filter } : {}),
	};
}
