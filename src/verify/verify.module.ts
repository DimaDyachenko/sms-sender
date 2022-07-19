import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import VerifyService from './verify.service';
import VerifyController from './verify.controller';

@Module({
  imports: [HttpModule],
  controllers: [VerifyController],
  providers: [VerifyService],
})
export class VerifyModule {}
