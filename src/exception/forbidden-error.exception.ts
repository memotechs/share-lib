import { HttpStatus } from '@nestjs/common';
import { BaseException, ParametersType } from './base.exception';

export class ForbiddenException extends BaseException {
  constructor(message?: string, code?: string, parameters?: ParametersType) {
    super(
      message ?? 'BadRequestException',
      HttpStatus.FORBIDDEN,
      code,
      parameters,
    );
  }
}
