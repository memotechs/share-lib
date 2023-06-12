"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationResponse = void 0;
class PaginationResponse {
    constructor(data, total = (data === null || data === void 0 ? void 0 : data.length) || 0, limit, offset) {
        this.data = data;
        this.total = total;
        this.offset = offset;
        this.limit = limit;
        this.hasNext = this.offset + this.limit < this.total;
    }
    toJSON() {
        return {
            data: this.data,
            total: this.total,
            count: this.data.length,
            offset: this.offset,
            limit: this.limit,
            hasNext: this.hasNext,
        };
    }
    promise() {
        return new Promise((resolve, reject) => {
            resolve(this);
        });
    }
}
exports.PaginationResponse = PaginationResponse;
//# sourceMappingURL=pagination.response.js.map