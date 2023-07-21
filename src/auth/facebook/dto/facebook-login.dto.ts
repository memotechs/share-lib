import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FacebookLoginDto {
  @ApiProperty({ example: 'abc' })
  @IsNotEmpty()
  accessToken: string;
}
