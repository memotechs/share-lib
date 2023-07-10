import { ForbiddenException } from './forbidden-error.exception';
import { HttpStatus } from '@nestjs/common';

describe('ForbiddenException', () => {
  it('should set default message and status code if no parameters are provided', () => {
    const error = new ForbiddenException();

    expect(error.message).toBe('BadRequestException');
    expect(error.statusCode).toBe(HttpStatus.FORBIDDEN);
    expect(error.parameters).toBeUndefined();
  });

  it('should set custom message, status code, and parameters if provided', () => {
    const customMessage = 'Custom message';
    const customStatusCode = HttpStatus.FORBIDDEN;
    const customParameters = { key: 'value' };
    const error = new ForbiddenException(customMessage, customParameters);

    expect(error.message).toBe(customMessage);
    expect(error.statusCode).toBe(customStatusCode);
    expect(error.parameters).toEqual(customParameters);
  });
});
