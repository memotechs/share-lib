"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypesenseExportsProvider = exports.createTypesenseOptionsProvider = void 0;
const typesense_1 = require("typesense");
const metadata_1 = require("./metadata");
const typesense_constants_1 = require("./typesense.constants");
const createTypesenseOptionsProvider = (options = {}) => [
    {
        provide: typesense_constants_1.TYPESENSE_MODULE_OPTIONS,
        useValue: options,
    },
];
exports.createTypesenseOptionsProvider = createTypesenseOptionsProvider;
const createTypesenseExportsProvider = () => [
    metadata_1.TypesenseMetadataRegistry,
    {
        provide: typesense_1.Client,
        useFactory: (options) => new typesense_1.Client({
            nodes: options.nodes || [
                {
                    host: process.env.TYPESENSE_HOST ||
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
        inject: [typesense_constants_1.TYPESENSE_MODULE_OPTIONS],
    },
];
exports.createTypesenseExportsProvider = createTypesenseExportsProvider;
//# sourceMappingURL=typesense.providers.js.map