import { HttpStatus } from '@nestjs/common';
import { BaseException, ParametersType } from './base.exception';

export class UnauthorizedException extends BaseException {
  constructor(message?: string, parameters?: ParametersType) {
    super(
      message ?? 'UnauthorizedException',
      HttpStatus.UNAUTHORIZED,
      parameters,
    );
  }
}
