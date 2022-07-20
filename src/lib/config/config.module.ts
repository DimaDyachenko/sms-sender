import { Global, Module } from '@nestjs/common';
import { ConfigModule as CM } from '@nestjs/config';
import { twilio } from './configuration';
import { TwilioGetter } from './TwilioGetter';

@Global()
@Module({
  imports: [
    CM.forRoot({
      load: [twilio],
    }),
  ],
  providers: [TwilioGetter],
  exports: [TwilioGetter],
})
export class ConfigModule {}
