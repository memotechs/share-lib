import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiPropertyOptional()
  @Type(() => String)
  query?: string;

  @ApiPropertyOptional()
  @Type(() => Number)
  limit?: number = 25;

  @ApiPropertyOptional()
  @Type(() => Number)
  offset?: number = 0;
}
