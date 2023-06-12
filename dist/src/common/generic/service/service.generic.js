"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceGeneric = void 0;
const typeorm_1 = require("typeorm");
const constant_1 = require("../../constant");
const response_1 = require("../../../response");
class ServiceGeneric {
    constructor(connectionOrManager, repositoryType) {
        this.connectionOrManager = connectionOrManager;
        this.loggable = false;
        this.create = async (entity) => {
            return this.repository.save(entity);
        };
        this.update = async (entity) => {
            return this.repository.save(entity);
        };
        this.getListWithPagination = async (paginationDto, callback) => {
            const { limit = 25, offset = 0 } = paginationDto;
            const query = this.repository.createQueryBuilder(this.entityName);
            query.limit(limit);
            query.offset(offset);
            query.where(`${this.entityName}.state != :state`, {
                state: constant_1.EntityStateConstant.Archived,
            });
            const defaultSelectable = ['createdAt', 'updatedAt'];
            query.orderBy(`${this.entityName}.updatedAt`, 'DESC');
            const selection = defaultSelectable.map((column) => `${this.entityName}.${column}`);
            query.addSelect(selection);
            if (callback != null) {
                callback(query);
            }
            const entities = await query.getMany();
            const total = await query.getCount();
            const response = new response_1.PaginationResponse(entities, total, limit, offset);
            return response;
        };
        this.getAutocompleteWithPagination = async (paginationDto, filter, callback) => {
            const { limit = 25, offset = 0 } = paginationDto;
            const query = this.repository.createQueryBuilder(this.entityName);
            query.limit(limit);
            query.offset(offset);
            query.where(`${this.entityName}.state != :state`, {
                state: constant_1.EntityStateConstant.Archived,
            });
            const defaultSelectable = ['createdAt', 'updatedAt'];
            query.orderBy(`${this.entityName}.updatedAt`, 'DESC');
            const selection = defaultSelectable.map((column) => `${this.entityName}.${column}`);
            query.addSelect(selection);
            if (callback != null) {
                callback(query);
            }
            const { excludeIds = [], includeIds = [] } = Object.assign({}, filter);
            if ((excludeIds === null || excludeIds === void 0 ? void 0 : excludeIds.length) > 0) {
                query.andWhere(`${this.entityName}.id NOT IN (:ids)`, {
                    ids: excludeIds,
                });
            }
            let entities = await query.getMany();
            const total = await query.getCount();
            const allIds = [];
            for (const id of includeIds) {
                const entity = entities.filter((entity) => entity.id === id);
                if (entity.length == 0) {
                    allIds.push(id);
                }
            }
            if (allIds.length > 0) {
                query.where(`${this.entityName}.id IN (:ids)`, { ids: allIds });
                const data = await query.getMany();
                entities = data.concat(entities);
            }
            const response = new response_1.PaginationResponse(entities, total, limit, offset);
            return response;
        };
        if (connectionOrManager instanceof typeorm_1.EntityManager) {
            this.connection = connectionOrManager.connection;
        }
        else {
            this.connection = connectionOrManager;
        }
        this.repository = this.connection.getCustomRepository(repositoryType);
    }
}
exports.ServiceGeneric = ServiceGeneric;
//# sourceMappingURL=service.generic.js.map