import { BadRequestException } from '@nestjs/common';

export class GRPCBadRequestErrorException extends BadRequestException {
  constructor(options: object) {
    super(options);
  }
}
