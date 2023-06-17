import { EntityGeneric } from '../../../generic';
import { BaseDocument } from '../document';
export interface TransformerService<T extends EntityGeneric, Document extends BaseDocument> {
    transform(data: T): Document;
    transforms(datas: T[]): Document[];
}
