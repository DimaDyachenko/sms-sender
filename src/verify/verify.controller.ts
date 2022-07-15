import { Body, Controller, Post } from '@nestjs/common';
import SmsService from './verify.service';
import {
  VerifyCodeCheckedResponse,
  VerifyCodeSendResponse,
} from './utils/verify-response';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { PhoneDTO, VerifyCodeDTO } from './utils/verify-request';
import AttemptService from './services/attempt.service';

@Controller('verify')
export default class VerifyController {
  private twilioClient: Twilio;
  constructor(
    private readonly smsService: SmsService,
    private readonly configService: ConfigService,
    private readonly attemptService: AttemptService,
  ) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  @Post('send')
  async sendVerifyCode(@Body() body: PhoneDTO) {
    // const smsDetails = await this.smsService.sendMessage(body.phoneNumber);
    // const checkStatusMessage = await this.twilioClient
    //   .messages(result.sid)
    //   .fetch()
    //   .then((res) => res);

    await this.smsService.sendVerifyCode(body.phoneNumber);

    return JSON.stringify(new VerifyCodeSendResponse(body.phoneNumber));
  }

  @Post('check')
  async checkVerifyCode(@Body() body: VerifyCodeDTO) {
    const verifyCode = await this.smsService.checkVerifyCode(
      body.phoneNumber,
      body.verifyCode,
    );

    return JSON.stringify(
      new VerifyCodeCheckedResponse('ok', body.phoneNumber),
    );
  }
}
