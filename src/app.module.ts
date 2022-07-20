import { Module } from '@nestjs/common';
import { VerifyModule } from './verify/verify.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from './lib/config/config.module';

@Module({
  imports: [
    VerifyModule,
    ThrottlerModule.forRoot({ ttl: 60, limit: 3 }),
    ConfigModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
