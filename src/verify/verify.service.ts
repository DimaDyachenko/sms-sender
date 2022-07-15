import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import AttemptService from './services/attempt.service';

@Injectable()
export default class VerifyService {
  private twilioClient: Twilio;

  constructor(
    private readonly configService: ConfigService,
    private readonly attemptService: AttemptService,
  ) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  // this method can send sms and check it status

  // async sendMessage(receiverPhoneNumber: string) {
  //   const senderPhoneNumber = this.configService.get(
  //     'TWILIO_SENDER_PHONE_NUMBER',
  //   );
  //   const message = 'Hello world';

  //   return this.twilioClient.messages.create({
  //     body: message,
  //     from: senderPhoneNumber,
  //     to: receiverPhoneNumber,
  //   });
  // }

  async sendVerifyCode(receiverPhoneNumber: string) {
    const verifyToken = this.configService.get('VERIFICATION_SID');

    return this.twilioClient.verify.v2
      .services(verifyToken)
      .verifications.create({ to: receiverPhoneNumber, channel: 'sms' });
  }

  async checkVerifyCode(receiverPhoneNumber: string, code: string) {
    const verifyToken = this.configService.get('VERIFICATION_SID');
    const checkCode = await this.twilioClient.verify.v2
      .services(verifyToken)
      .verificationChecks.create({ to: receiverPhoneNumber, code: code });

    console.log(checkCode);
    return checkCode;

    // this.attemptService.setFreeAttempts(checkCode.accountSid, checkCode.)

    // try {
    //   const attempts = await this.attemptService.checkFreeAttempts(verifyCode);
    //   console.log(attempts);
    //   return attempts;
    // } catch (err) {
    //   console.log(err);
    // }
  }
}
