import { HttpStatus } from '@nestjs/common';
import { BadRequestException } from './bad-request-error.exception';

describe('BadRequestException', () => {
  it('should set default message and status code if no parameters are provided', () => {
    const error = new BadRequestException();

    expect(error.message).toBe('BadRequestException');
    expect(error.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(error.parameters).toBeUndefined();
  });

  it('should set custom message, status code, and parameters if provided', () => {
    const customMessage = 'Custom message';
    const customStatusCode = HttpStatus.BAD_REQUEST;
    const customParameters = { key: 'value' };
    const error = new BadRequestException(customMessage, customParameters);

    expect(error.message).toBe(customMessage);
    expect(error.statusCode).toBe(customStatusCode);
    expect(error.parameters).toEqual(customParameters);
    console.log(error);
  });
});
