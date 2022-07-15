import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import VerifyService from './verify.service';
import VerifyController from './verify.controller';
import { AttemptModule } from './services/attempt.module';
import AttemptService from './services/attempt.service';

@Module({
  imports: [HttpModule, AttemptModule],
  controllers: [VerifyController],
  providers: [VerifyService, AttemptService],
})
export class VerifyModule {}
