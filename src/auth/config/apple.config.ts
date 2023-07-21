import { registerAs } from '@nestjs/config';
import { AppleConfig } from '../../config';
import { IsJSON, IsOptional } from 'class-validator';
import { validateConfig } from '../../util';

class EnvironmentVariablesValidator {
  @IsJSON()
  @IsOptional()
  APPLE_APP_AUDIENCE: string;
}

export default registerAs<AppleConfig>('apple', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    appAudience: JSON.parse(process.env.APPLE_APP_AUDIENCE ?? '[]'),
  };
});
