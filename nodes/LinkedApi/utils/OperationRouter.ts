import type { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import LinkedApi from '../linkedapi-node';
import IOperation from './IOperation';
import { FetchPersonOperation } from '../operations/FetchPerson';
import { FetchCompanyOperation } from '../operations/FetchCompany';
import { SearchCompaniesOperation } from '../operations/SearchCompanies';
import { SalesNavigatorSearchCompaniesOperation } from '../operations/SalesNavigatorSearchCompanies';

export class OperationRouter {
	private operations: Map<string, IOperation<any>>;
	constructor(private readonly linkedapi: LinkedApi) {
		this.operations = new Map();
		this.initializeOperations();
	}

	private initializeOperations(): void {
		this.operations.set('fetchPerson', new FetchPersonOperation());
		this.operations.set('fetchCompany', new FetchCompanyOperation());
		this.operations.set('searchCompanies', new SearchCompaniesOperation());
		this.operations.set(
			'salesNavigatorSearchCompanies',
			new SalesNavigatorSearchCompaniesOperation(),
		);
	}

	public async executeOperation(
		executeFunctions: IExecuteFunctions,
		operation: string,
		itemIndex: number,
	): Promise<INodeExecutionData> {
		const operationHandler = this.operations.get(operation);
		if (!operationHandler) {
			const availableOps = Array.from(this.operations.keys()).join(', ');
			throw new NodeOperationError(
				executeFunctions.getNode(),
				`Unknown operation: ${operation}. Available operations: ${availableOps}`,
				{ itemIndex },
			);
		}
		try {
			const params = await operationHandler.buildParams(executeFunctions, itemIndex);
			const result = await operationHandler.execute(this.linkedapi, params);
			return {
				json: result,
				pairedItem: { item: itemIndex },
			};
		} catch (error) {
			throw error;
		}
	}
}
