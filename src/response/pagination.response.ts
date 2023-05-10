export class PaginationResponse<T> {
  data: T[];
  total?: number;
  offset?: number;
  limit?: number;
  hasNext?: boolean;

  constructor(
    data: T[],
    total: number = data?.length || 0,
    limit?: number,
    offset?: number,
  ) {
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

  promise(): Promise<PaginationResponse<T>> {
    return new Promise((resolve, reject) => {
      resolve(this);
    });
  }
}
