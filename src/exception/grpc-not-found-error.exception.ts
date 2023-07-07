import { BadRequestException } from '@nestjs/common';

export class GRPCNotFoundErrorException extends BadRequestException {
  constructor(options: object) {
    super(options);
  }
}
