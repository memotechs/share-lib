import { HttpStatus } from '@nestjs/common';
import { BaseException, ParametersType } from './base.exception';

export class NotFoundException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'NotFoundException', HttpStatus.NOT_FOUND, parameters);
  }
}
