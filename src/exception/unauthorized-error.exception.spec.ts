import { UnauthorizedException } from './unauthorized-error.exception';
import { HttpStatus } from '@nestjs/common';

describe('UnauthorizedException', () => {
  it('should set default message and status code if no parameters are provided', () => {
    const error = new UnauthorizedException();

    expect(error.message).toBe('UnauthorizedException');
    expect(error.statusCode).toBe(HttpStatus.UNAUTHORIZED);
    expect(error.parameters).toBeUndefined();
  });

  it('should set custom message, status code, and parameters if provided', () => {
    const customMessage = 'Custom message';
    const customStatusCode = HttpStatus.UNAUTHORIZED;
    const customParameters = { key: 'value' };
    const error = new UnauthorizedException(customMessage, customParameters);

    expect(error.message).toBe(customMessage);
    expect(error.statusCode).toBe(customStatusCode);
    expect(error.parameters).toEqual(customParameters);
  });
});
