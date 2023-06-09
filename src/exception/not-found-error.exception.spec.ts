import { NotFoundException } from './not-found-error.exception';
import { HttpStatus } from '@nestjs/common';

describe('NotFoundException', () => {
  it('should set default message and status code if no parameters are provided', () => {
    const error = new NotFoundException();

    expect(error.message).toBe('NotFoundException');
    expect(error.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(error.parameters).toBeUndefined();
  });

  it('should set custom message, status code, and parameters if provided', () => {
    const customMessage = 'Custom message';
    const customStatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const customParameters = { key: 'value' };
    const error = new NotFoundException(customMessage, customParameters);

    expect(error.message).toBe(customMessage);
    expect(error.statusCode).toBe(customStatusCode);
    expect(error.parameters).toEqual(customParameters);
  });
});
