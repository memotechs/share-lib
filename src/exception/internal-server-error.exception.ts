import { HttpStatus } from '@nestjs/common';
import { BaseException, ParametersType } from './base.exception';

export class InternalServerException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(
      message ?? 'InternalServerException',
      HttpStatus.INTERNAL_SERVER_ERROR,
      parameters,
    );
  }
}
