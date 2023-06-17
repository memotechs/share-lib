"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TypesenseMetadataRegistry_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypesenseMetadataRegistry = void 0;
const common_1 = require("@nestjs/common");
let TypesenseMetadataRegistry = exports.TypesenseMetadataRegistry = TypesenseMetadataRegistry_1 = class TypesenseMetadataRegistry {
    constructor() {
        this.logger = new common_1.Logger(TypesenseMetadataRegistry_1.name);
        this.schemas = new Map();
    }
    addSchema(target, schema) {
        if (this.schemas.has(target)) {
            this.logger.warn(`Schema ${target} already exists`);
        }
        this.schemas.set(target, schema);
    }
    getSchemaByTarget(target) {
        return this.schemas.get(target);
    }
    getTargets() {
        return this.schemas.keys();
    }
};
exports.TypesenseMetadataRegistry = TypesenseMetadataRegistry = TypesenseMetadataRegistry_1 = __decorate([
    (0, common_1.Injectable)()
], TypesenseMetadataRegistry);
//# sourceMappingURL=typesense.metadata-registry.js.map