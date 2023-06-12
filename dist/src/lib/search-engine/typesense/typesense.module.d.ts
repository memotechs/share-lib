import { DynamicModule } from '@nestjs/common';
import { TypesenseModuleAsyncOptions, TypesenseModuleOptions } from './typesense-module.interface';
export declare class TypesenseModule {
    static register(options?: TypesenseModuleOptions): DynamicModule;
    static registerAsync(options: TypesenseModuleAsyncOptions): DynamicModule;
    private static createAsyncProviders;
    private static createAsyncOptionsProvider;
}
