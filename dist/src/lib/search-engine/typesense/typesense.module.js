"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TypesenseModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesenseModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const typesense_constants_1 = require("./typesense.constants");
const typesense_providers_1 = require("./typesense.providers");
let TypesenseModule = exports.TypesenseModule = TypesenseModule_1 = class TypesenseModule {
    static register(options = {}) {
        const optionsProviders = (0, typesense_providers_1.createTypesenseOptionsProvider)(options);
        const exportsProviders = (0, typesense_providers_1.createTypesenseExportsProvider)();
        return {
            global: true,
            module: TypesenseModule_1,
            providers: [...optionsProviders, ...exportsProviders],
            exports: exportsProviders,
        };
    }
    static registerAsync(options) {
        const exportsProviders = (0, typesense_providers_1.createTypesenseExportsProvider)();
        return {
            global: true,
            module: TypesenseModule_1,
            imports: options.imports || [],
            providers: [...this.createAsyncProviders(options), ...exportsProviders],
            exports: exportsProviders,
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: options === null || options === void 0 ? void 0 : options.useClass,
                useClass: options === null || options === void 0 ? void 0 : options.useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: typesense_constants_1.TYPESENSE_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: typesense_constants_1.TYPESENSE_MODULE_OPTIONS,
            useFactory: (optionsFactory) => optionsFactory.createTypesenseOptions(),
            inject: [(options === null || options === void 0 ? void 0 : options.useExisting) || (options === null || options === void 0 ? void 0 : options.useClass)],
        };
    }
};
exports.TypesenseModule = TypesenseModule = TypesenseModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [core_1.DiscoveryModule],
    })
], TypesenseModule);
//# sourceMappingURL=typesense.module.js.map