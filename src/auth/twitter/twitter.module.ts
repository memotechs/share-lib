import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwitterService } from './twitter.service';

@Module({
  imports: [ConfigModule],
  providers: [TwitterService],
  exports: [TwitterService],
  controllers: [],
})
export class TwitterModule {}
