import { Facebook } from 'fb';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocialInterface } from '../../interface';
import { FacebookInterface } from './interface';
import { FacebookLoginDto } from './dto/facebook-login.dto';
import { AllConfigType } from '../../config';

@Injectable()
export class FacebookService {
  private fb: Facebook;

  constructor(private readonly configService: ConfigService<AllConfigType>) {
    this.fb = new Facebook({
      appId: configService.get('facebook.appId', {
        infer: true,
      }),
      appSecret: configService.get('facebook.appSecret', {
        infer: true,
      }),
      version: 'v7.0',
    });
  }

  async getProfileByToken(
    loginDto: FacebookLoginDto,
  ): Promise<SocialInterface> {
    this.fb.setAccessToken(loginDto.accessToken);

    const data: FacebookInterface = await new Promise((resolve) => {
      this.fb.api(
        '/me',
        'get',
        { fields: 'id,last_name,email,first_name' },
        (response: FacebookInterface) => {
          resolve(response);
        },
      );
    });

    const { id, email, first_name, last_name } = data;

    return {
      id: id,
      email: email,
      firstName: first_name,
      lastName: last_name,
    };
  }
}
