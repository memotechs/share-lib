import { ApiPropertyOptional } from '@nestjs/swagger';
export class PaginationResponse<TData> {
  @ApiPropertyOptional()
  data: TData[];

  @ApiPropertyOptional()
  total?: number = 0;

  @ApiPropertyOptional()
  offset?: number = 0;

  @ApiPropertyOptional()
  limit?: number = 25;

  @ApiPropertyOptional()
  hasNext?: boolean = false;

  constructor(
    data: TData[],
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

  promise(): Promise<PaginationResponse<TData>> {
    return new Promise((resolve, reject) => {
      resolve(this);
    });
  }
}
