import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import VerifyService from './verify.service';
import VerifyController from './verify.controller';
import { ThrottlerBehindProxyGuard } from './guards/throttler.guard';

@Module({
  imports: [HttpModule],
  controllers: [VerifyController],
  providers: [VerifyService, ThrottlerBehindProxyGuard],
})
export class VerifyModule {}
