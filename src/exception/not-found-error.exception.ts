import { BadRequestException } from '@nestjs/common';

export class NotFoundErrorException extends BadRequestException {
  constructor(options: object) {
    super(options);
  }
}
