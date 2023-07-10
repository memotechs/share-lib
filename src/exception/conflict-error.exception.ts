import { HttpStatus } from '@nestjs/common';
import { BaseException, ParametersType } from './base.exception';

export class ConflictException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(message ?? 'ConflictException', HttpStatus.CONFLICT, parameters);
  }
}
