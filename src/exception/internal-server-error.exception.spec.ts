import { InternalServerException } from './internal-server-error.exception';
import { HttpStatus } from '@nestjs/common';

describe('InternalServerException', () => {
  it('should set default message and status code if no parameters are provided', () => {
    const error = new InternalServerException();

    expect(error.message).toBe('InternalServerException');
    expect(error.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(error.parameters).toBeUndefined();
  });

  it('should set custom message, status code, and parameters if provided', () => {
    const customMessage = 'Custom message';
    const customStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const customParameters = { key: 'value' };
    const error = new InternalServerException(customMessage, customParameters);

    expect(error.message).toBe(customMessage);
    expect(error.statusCode).toBe(customStatusCode);
    expect(error.parameters).toEqual(customParameters);
  });
});
