import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @ApiPropertyOptional()
  query: string;

  @ApiPropertyOptional()
  limit = 25;

  @ApiPropertyOptional()
  offset = 0;
}
