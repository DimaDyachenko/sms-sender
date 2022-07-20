import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import VerifyService from './verify.service';
import VerifyController from './verify.controller';
import { ConfigModule } from '../lib/config/config.module';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [VerifyController],
  providers: [VerifyService],
})
export class VerifyModule {}
