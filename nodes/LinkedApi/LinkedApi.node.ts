import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError, NodeConnectionType, NodeOperationError } from 'n8n-workflow';
import LinkedApiSdk, { LinkedApiError } from './linkedapi-node';
import { OperationRouter } from './utils/OperationRouter';
import { LinkedApiHttpClient } from './utils/LinkedApiHttpClient';
import { fetchPersonFields } from './operations/FetchPerson';
import {
	availableSalesNavigatorOperations,
	availableStandardOperations,
} from './descriptions/AvailableOperations';
import { availableModes } from './descriptions/AvailableModes';
import { searchCompaniesFields } from './operations/SearchCompanies';
import { fetchCompanyFields } from './operations/FetchCompany';
import { salesNavigatorSearchCompaniesFields } from './operations/SalesNavigatorSearchCompanies';

export class LinkedApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Linked API',
		name: 'linkedApi',
		icon: {
			light: 'file:linked-api-light.svg',
			dark: 'file:linked-api-dark.svg',
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Control your LinkedIn accounts and retrieve real-time data.',
		defaults: {
			name: 'Linked API',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'linkedApi',
				required: true,
			},
		],
		properties: [
			availableModes,
			availableStandardOperations,
			availableSalesNavigatorOperations,
			// Standard operations
			...fetchPersonFields,
			...fetchCompanyFields,
			...searchCompaniesFields,
			// Sales Navigator operations
			...salesNavigatorSearchCompaniesFields,
		],
	};

	public async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = await this.getCredentials('linkedApi');
		const linkedApiToken = credentials.linkedApiToken as string;
		const identificationToken = credentials.identificationToken as string;
		const linkedapi = new LinkedApiSdk(
			new LinkedApiHttpClient(this, {
				linkedApiToken,
				identificationToken,
			}),
		);

		const operationRouter = new OperationRouter(linkedapi);

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;

				const result = await operationRouter.executeOperation(this, operation, i);

				returnData.push(result);
			} catch (error) {
				if (error instanceof LinkedApiError) {
					this.logger.error(`Item ${i}: Linked API Error:`, {
						message: error.message,
						details: error.details,
						type: error.type,
						operation: this.getNodeParameter('operation', i) as string,
						itemIndex: i,
						nodeId: this.getNode().id,
					});
				} else {
					this.logger.error(`Item ${i}: Error details:`, {
						message: (error as Error).message,
						name: (error as Error).name,
						operation: this.getNodeParameter('operation', i) as string,
						itemIndex: i,
						nodeId: this.getNode().id,
						nodeName: this.getNode().name,
					});
				}

				if (this.continueOnFail()) {
					if (error instanceof LinkedApiError) {
						returnData.push({
							json: {
								error: error.message,
								type: error.type,
								details: error.details as IDataObject,
							},
							pairedItem: { item: i },
						});
					} else {
						returnData.push({
							json: { error: (error as Error).message },
							pairedItem: { item: i },
						});
					}
				} else {
					if (error instanceof LinkedApiError) {
						throw new NodeApiError(
							this.getNode(),
							{
								message: error.message,
								type: error.type,
								details: error.details as JsonObject,
							},
							{ itemIndex: i },
						);
					}
					if (error instanceof NodeOperationError || error instanceof NodeApiError) {
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error, { itemIndex: i });
				}
			}
		}

		return [returnData];
	}
}
