import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { SocialInterface } from '../../interface';
import { GoogleLoginDto } from './dto/google-login.dto';
import { GoogleConfig } from '../../config';

@Injectable()
export class GoogleService {
  private google: OAuth2Client;

  constructor(private configService: ConfigService<GoogleConfig>) {
    this.google = new OAuth2Client(
      configService.get('clientId', { infer: true }),
      configService.get('clientSecret', { infer: true }),
    );
  }

  async getProfileByToken(loginDto: GoogleLoginDto): Promise<SocialInterface> {
    const { idToken } = loginDto;
    const ticket = await this.google.verifyIdToken({
      idToken: idToken,
      audience: [this.configService.getOrThrow('clientId', { infer: true })],
    });

    const data = ticket.getPayload();

    if (!data) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'wrongToken',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const { sub, email, given_name, family_name } = data;

    return {
      id: sub,
      email: email,
      firstName: given_name,
      lastName: family_name,
    };
  }
}
