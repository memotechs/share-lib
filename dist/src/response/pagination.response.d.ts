export declare class PaginationResponse<T> {
    data: T[];
    total?: number;
    offset?: number;
    limit?: number;
    hasNext?: boolean;
    constructor(data: T[], total?: number, limit?: number, offset?: number);
    toJSON(): {
        data: T[];
        total: number;
        count: number;
        offset: number;
        limit: number;
        hasNext: boolean;
    };
    promise(): Promise<PaginationResponse<T>>;
}
