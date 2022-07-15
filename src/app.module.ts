import { Module } from '@nestjs/common';
import { VerifyModule } from './verify/verify.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    VerifyModule,
  ],
})
export class AppModule {}
