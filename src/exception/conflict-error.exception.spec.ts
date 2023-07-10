import { HttpStatus } from '@nestjs/common';
import { ConflictException } from './conflict-error.exception';

describe('ConflictException', () => {
  it('should set default message and status code if no parameters are provided', () => {
    const error = new ConflictException();

    expect(error.message).toBe('ConflictException');
    expect(error.statusCode).toBe(HttpStatus.CONFLICT);
    expect(error.parameters).toBeUndefined();
  });

  it('should set custom message, status code, and parameters if provided', () => {
    const customMessage = 'Custom message';
    const customStatusCode = HttpStatus.CONFLICT;
    const customParameters = { key: 'value' };
    const error = new ConflictException(customMessage, customParameters);

    expect(error.message).toBe(customMessage);
    expect(error.statusCode).toBe(customStatusCode);
    expect(error.parameters).toEqual(customParameters);
  });
});
