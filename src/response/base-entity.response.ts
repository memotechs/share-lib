import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class BaseEntityResponse {
  @ApiPropertyOptional()
  @Type(() => Number)
  id?: number;
}
