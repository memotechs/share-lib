import Twitter from 'twitter';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../config';
import { SocialInterface } from '../../interface';
import { TwitterLoginDto } from './dto/twitter-login.dto';

@Injectable()
export class TwitterService {
  constructor(private configService: ConfigService<AllConfigType>) {}

  async getProfileByToken(loginDto: TwitterLoginDto): Promise<SocialInterface> {
    const { accessTokenKey, accessTokenSecret } = loginDto;
    const twitter = new Twitter({
      consumer_key: this.configService.getOrThrow('twitter.consumerKey', {
        infer: true,
      }),
      consumer_secret: this.configService.getOrThrow('twitter.consumerSecret', {
        infer: true,
      }),
      access_token_key: accessTokenKey,
      access_token_secret: accessTokenSecret,
    });

    const data: Twitter.ResponseData = await new Promise((resolve) => {
      twitter.get(
        'account/verify_credentials',
        { include_email: true },
        (error, profile) => {
          resolve(profile);
        },
      );
    });

    const { id, email, name } = data;

    return {
      id: id.toString(),
      email: email,
      firstName: name,
    };
  }
}
