import { BadRequestException } from '@nestjs/common';
import { BadRequestErrorException } from './bad-request-error.exception';

describe('BadRequestErrorException', () => {
  it('should extend BadRequestException', () => {
    const options = {}; // Create options object as needed
    const error = new BadRequestErrorException(options);

    expect(error instanceof BadRequestException).toBe(true);
  });

  it('should set options correctly', () => {
    const options = { message: 'Bad request' }; // Create options object as needed
    const error = new BadRequestErrorException(options);

    expect(error.message).toBe(options.message);
    // Add more assertions for other properties in the options object, if applicable
  });
});
