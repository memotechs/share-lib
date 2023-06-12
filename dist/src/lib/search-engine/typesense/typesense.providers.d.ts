import { Provider } from '@nestjs/common';
import { TypesenseModuleOptions } from './typesense-module.interface';
export declare const createTypesenseOptionsProvider: (options?: TypesenseModuleOptions) => Provider[];
export declare const createTypesenseExportsProvider: () => Provider[];
