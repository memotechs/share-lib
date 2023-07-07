import { BadRequestException } from '@nestjs/common';

export class BadRequestErrorException extends BadRequestException {
  constructor(options: object) {
    super(options);
  }
}
