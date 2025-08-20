import type { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import LinkedApi from '../linkedapi-node';

export default abstract class IOperation<TParams> {
	abstract buildParams(functions: IExecuteFunctions, itemIndex: number): Promise<TParams>;

	abstract execute(linkedapi: LinkedApi, params: TParams): Promise<IDataObject>;
}
