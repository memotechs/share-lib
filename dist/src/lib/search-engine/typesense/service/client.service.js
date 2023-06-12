"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const class_transformer_1 = require("class-transformer");
const response_1 = require("../../../../response");
class ClientService {
    constructor(client, schema, prefix) {
        this.client = client;
        this.schema = schema;
        this.prefix = prefix;
        this.skipCheckSchema = false;
        this.getAllRawDocs = async (searchParameters, options) => {
            var _a;
            searchParameters.per_page = (_a = searchParameters.per_page) !== null && _a !== void 0 ? _a : 250;
            options.cacheSearchResultsForSeconds = 1;
            const response = await this.searchDocument(searchParameters, options);
            const { hits = [], found = 0, page = 1 } = response;
            let documents = hits;
            const hasNext = hits.length * page < found;
            if (hasNext) {
                searchParameters.page = page + 1;
                documents = await this.getAllRawDocs(searchParameters, options);
            }
            return documents;
        };
        this.updateDocumentById = async (data) => {
            var _a, _b;
            if (data === null || data === void 0 ? void 0 : data.id) {
                const exist = await this.client
                    .collections(((_a = this === null || this === void 0 ? void 0 : this.schema) === null || _a === void 0 ? void 0 : _a.name) || this.prefix)
                    .documents(data.id)
                    .retrieve();
                if (exist) {
                    return this.client
                        .collections(((_b = this === null || this === void 0 ? void 0 : this.schema) === null || _b === void 0 ? void 0 : _b.name) || this.prefix)
                        .documents(data.id)
                        .update(data);
                }
            }
        };
        this.transforms = (searchResponse) => {
            const entities = [];
            const { hits = [] } = Object.assign({}, searchResponse);
            for (const hit of hits) {
                const document = hit === null || hit === void 0 ? void 0 : hit.document;
                if (document) {
                    const entity = (0, class_transformer_1.plainToClass)(this.entity, document);
                    entity.id = Number(document.id);
                    entities.push(entity);
                }
            }
            return entities;
        };
        this.transform = (searchResponse) => {
            let entity = null;
            const { hits = [] } = Object.assign({}, searchResponse);
            for (const hit of hits) {
                const document = hit === null || hit === void 0 ? void 0 : hit.document;
                if (document) {
                    entity = (0, class_transformer_1.plainToClass)(this.entity, document);
                    entity.id = Number(document.id);
                }
                break;
            }
            return entity;
        };
        this.responseList = (searchResponse, offset = 0) => {
            const entities = [];
            const { hits = [], found = 0, page = 1, request_params, } = Object.assign({}, searchResponse);
            for (const hit of hits) {
                const document = hit === null || hit === void 0 ? void 0 : hit.document;
                if (document) {
                    const entity = (0, class_transformer_1.plainToClass)(this.entity, document);
                    entity.id = Number(document.id);
                    entities.push(entity);
                }
            }
            const limit = request_params === null || request_params === void 0 ? void 0 : request_params.per_page;
            return new response_1.PaginationResponse(entities, found, limit, offset);
        };
        this.ensureCollection = async () => {
            this.checkSchemaName();
            const exists = await this.client.collections(this.schema.name).exists();
            if (!exists) {
                await this.client.collections().create(this.schema);
            }
        };
        this.checkSchemaName = () => {
            const schemaName = this.schema.name.replace(/.*?\_/gi, '');
            this.schema.name = `${this.prefix}_${schemaName}`;
        };
        if (!this.skipCheckSchema && schema != null) {
            this.ensureCollection();
        }
    }
    async searchDocument(searchParameters, options) {
        var _a, _b, _c;
        try {
            const { includeIds = [], per_page = 25 } = Object.assign({}, searchParameters);
            const includeDocuments = [];
            if (includeIds.length > 0) {
                const includeOpts = Object.assign(Object.assign({}, searchParameters), { filter_by: `id:=[${includeIds.join(', ')}]` });
                const includeDocs = await this.client
                    .collections(((_a = this === null || this === void 0 ? void 0 : this.schema) === null || _a === void 0 ? void 0 : _a.name) || this.prefix)
                    .documents()
                    .search(includeOpts, options);
                if (((_b = includeDocs === null || includeDocs === void 0 ? void 0 : includeDocs.hits) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                    const names = includeDocs.hits.map((data) => data.document.name);
                    searchParameters.filter_by =
                        searchParameters.filter_by == null
                            ? `name:!=[${names.join(', ')}]`
                            : `${searchParameters.filter_by} && name:!=[${names.join(', ')}]`;
                    searchParameters.per_page = per_page - names.length;
                }
                includeDocuments.push(...includeDocs === null || includeDocs === void 0 ? void 0 : includeDocs.hits);
            }
            const documents = await this.client
                .collections(((_c = this === null || this === void 0 ? void 0 : this.schema) === null || _c === void 0 ? void 0 : _c.name) || this.prefix)
                .documents()
                .search(searchParameters, options);
            if (includeDocuments.length > 0) {
                documents.hits.push(...includeDocuments);
                documents.request_params.per_page = per_page;
            }
            return documents;
        }
        catch (error) {
            return null;
        }
    }
    async importIndex(data) {
        var _a;
        if (data.length > 0) {
            try {
                return this.client
                    .collections(((_a = this === null || this === void 0 ? void 0 : this.schema) === null || _a === void 0 ? void 0 : _a.name) || this.prefix)
                    .documents()
                    .import(data, { action: 'upsert' });
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    async deleteOutOfDate(data, key) {
        var _a;
        if ((data === null || data === void 0 ? void 0 : data.length) > 0) {
            const deleteParameters = {
                filter_by: `${key}:!=[${data.join(', ')}]`,
            };
            return await this.client
                .collections(((_a = this === null || this === void 0 ? void 0 : this.schema) === null || _a === void 0 ? void 0 : _a.name) || this.prefix)
                .documents()
                .delete(deleteParameters);
        }
    }
    async insertIndex(data) {
        var _a;
        return this.client
            .collections(((_a = this === null || this === void 0 ? void 0 : this.schema) === null || _a === void 0 ? void 0 : _a.name) || this.prefix)
            .documents()
            .create(data, { action: 'upsert' });
    }
    async updateIndex(data) {
        var _a;
        return this.client
            .collections(((_a = this === null || this === void 0 ? void 0 : this.schema) === null || _a === void 0 ? void 0 : _a.name) || this.prefix)
            .documents()
            .upsert(data, { action: 'upsert' });
    }
    async upsertOrDeleteIndex(datas) {
        throw new Error('Method is not implement.');
    }
    async deleteIndex(data) {
        var _a;
        return this.client
            .collections(((_a = this === null || this === void 0 ? void 0 : this.schema) === null || _a === void 0 ? void 0 : _a.name) || this.prefix)
            .documents()
            .delete({ filter_by: `id: ${data.id}` });
    }
    async deleteBatchIndex(ids) {
        var _a;
        return this.client
            .collections(((_a = this === null || this === void 0 ? void 0 : this.schema) === null || _a === void 0 ? void 0 : _a.name) || this.prefix)
            .documents()
            .delete({ filter_by: `id: [${ids.join(',')}]` });
    }
    async deleteIndexByKeyValue(key = 'id', value) {
        var _a;
        return this.client
            .collections(((_a = this === null || this === void 0 ? void 0 : this.schema) === null || _a === void 0 ? void 0 : _a.name) || this.prefix)
            .documents()
            .delete({ filter_by: `${key}:=${value}` });
    }
}
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map