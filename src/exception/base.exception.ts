import { HttpException, HttpStatus } from '@nestjs/common';

export type ErrorModel = {
  error: {
    code: string | number;
    traceid: string;
    message: string;
    timestamp: string;
    path: string;
  };
};

export type ParametersType = { [key: string]: unknown };

export class BaseException extends HttpException {
  traceid: string;
  readonly context: string;
  readonly statusCode: number;
  readonly code?: string;
  readonly parameters: ParametersType;

  constructor(
    message: string,
    status: HttpStatus,
    parameters?: ParametersType,
  ) {
    super(message, status);

    if (parameters) {
      this.parameters = parameters;
    }

    this.statusCode = super.getStatus();
    Error.captureStackTrace(this);
  }
}
