import { Schema } from './schema.metadata';
type Constructor = new (...args: any[]) => Record<string, unknown>;
export declare class TypesenseMetadataRegistry {
    private logger;
    private schemas;
    addSchema(target: Constructor, schema: Schema): void;
    getSchemaByTarget(target: Constructor): Schema;
    getTargets(): IterableIterator<Constructor>;
}
export {};
