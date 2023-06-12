"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const testing_1 = require("@nestjs/testing");
const typesense_constants_1 = require("./typesense.constants");
const typesense_module_1 = require("./typesense.module");
describe('typesense', () => {
    describe('module', () => {
        let module;
        afterEach(async () => {
            await module.close();
        });
        it(`register`, async () => {
            module = await testing_1.Test.createTestingModule({
                imports: [
                    typesense_module_1.TypesenseModule.register({
                        apiKey: 'test',
                    }),
                ],
            }).compile();
            expect(module.get(typesense_constants_1.TYPESENSE_MODULE_OPTIONS)).toBeDefined();
        });
        it(`register async use factory`, async () => {
            module = await testing_1.Test.createTestingModule({
                imports: [
                    typesense_module_1.TypesenseModule.registerAsync({
                        useFactory: () => ({
                            apiKey: 'test',
                        }),
                    }),
                ],
            }).compile();
            expect(module.get(typesense_constants_1.TYPESENSE_MODULE_OPTIONS)).toBeDefined();
        });
        it(`register async use class`, async () => {
            class TestTypesenseModuleOptions {
                createTypesenseOptions() {
                    return {
                        apiKey: 'test',
                    };
                }
            }
            module = await testing_1.Test.createTestingModule({
                imports: [
                    typesense_module_1.TypesenseModule.registerAsync({
                        useClass: TestTypesenseModuleOptions,
                    }),
                ],
            }).compile();
            expect(module.get(typesense_constants_1.TYPESENSE_MODULE_OPTIONS)).toBeDefined();
        });
        it(`register async use exists`, async () => {
            class TestTypesenseModuleOptions {
                createTypesenseOptions() {
                    return {
                        apiKey: 'test',
                    };
                }
            }
            let TestTypesenseModule = class TestTypesenseModule {
            };
            TestTypesenseModule = __decorate([
                (0, common_1.Module)({})
            ], TestTypesenseModule);
            module = await testing_1.Test.createTestingModule({
                imports: [
                    typesense_module_1.TypesenseModule.registerAsync({
                        imports: [
                            {
                                module: TestTypesenseModule,
                                providers: [TestTypesenseModuleOptions],
                                exports: [TestTypesenseModuleOptions],
                            },
                        ],
                        useExisting: TestTypesenseModuleOptions,
                    }),
                ],
            }).compile();
            expect(module.get(typesense_constants_1.TYPESENSE_MODULE_OPTIONS)).toBeDefined();
        });
    });
});
//# sourceMappingURL=typesense.module.test.js.map