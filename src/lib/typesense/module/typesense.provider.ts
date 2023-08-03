import { Client } from 'typesense';
import { Provider } from '@nestjs/common';
import { TypesenseCollectionsCreator } from '../collection';
import {
  TypesenseMetadataAccessor,
  TypesenseMetadataRegistry,
  TypesenseMetadataExplorer,
} from '../metadata';
import { TypesenseModuleOptions } from './interface.module';
import { TYPESENSE_MODULE_OPTIONS } from './typesense.constant';

export const createTypesenseOptionsProvider = (
  options: TypesenseModuleOptions = {},
): Provider[] => [
  {
    provide: TYPESENSE_MODULE_OPTIONS,
    useValue: options,
  },
];

export const createTypesenseProvider = (): Provider[] => [
  TypesenseMetadataAccessor,
  TypesenseMetadataExplorer,
  TypesenseMetadataRegistry,
  TypesenseCollectionsCreator,
];

export const createTypesenseExportsProvider = (): Provider[] => [
  TypesenseMetadataRegistry,
  {
    provide: Client,
    useFactory: (options: TypesenseModuleOptions) =>
      new Client({
        nodes: options.nodes || [
          {
            host:
              process.env.TYPESENSE_HOST ||
              process.env.NODE_ENV === 'production'
                ? 'ts.typesense.svc.cluster.local'
                : 'localhost',
            port: 8108,
            protocol: 'http',
          },
        ],
        numRetries: options.numRetries || 10,
        apiKey: options.apiKey || process.env.TYPESENSE_API_KEY,
        connectionTimeoutSeconds: options.connectionTimeoutSeconds || 10,
        retryIntervalSeconds: options.retryIntervalSeconds || 0.1,
        healthcheckIntervalSeconds: options.healthcheckIntervalSeconds || 2,
        logLevel: options.logLevel || 'info',
      }),
    inject: [TYPESENSE_MODULE_OPTIONS],
  },
];
