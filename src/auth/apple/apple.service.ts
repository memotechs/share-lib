import { Injectable } from '@nestjs/common';
import appleSigninAuth from 'apple-signin-auth';
import { ConfigService } from '@nestjs/config';
import { SocialInterface } from '../../interface';
import { AppleLoginDto } from './dto';
import { AllConfigType } from '../../config';

@Injectable()
export class AppleService {
  constructor(private configService: ConfigService<AllConfigType>) {}

  async getProfileByToken(loginDto: AppleLoginDto): Promise<SocialInterface> {
    const { idToken, firstName, lastName } = loginDto;

    const data = await appleSigninAuth.verifyIdToken(idToken, {
      audience: this.configService.get('apple.appAudience', { infer: true }),
    });

    const { sub, email } = data;

    return {
      id: sub,
      email: email,
      firstName: firstName,
      lastName: lastName,
    };
  }
}
