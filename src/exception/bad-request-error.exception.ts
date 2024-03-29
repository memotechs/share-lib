import { HttpStatus } from '@nestjs/common';
import { BaseException, ParametersType } from './base.exception';

export class BadRequestException extends BaseException {
  constructor(message?: string, code?: string, parameters?: ParametersType) {
    super(
      message ?? 'BadRequestException',
      HttpStatus.BAD_REQUEST,
      code,
      parameters,
    );
  }
}
