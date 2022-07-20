import { Injectable } from '@nestjs/common';
import Twilio from 'twilio';
import { TwilioGetter } from '../lib/config/TwilioGetter';

@Injectable()
export default class VerifyService {
  private twilioClient;

  constructor(private readonly twilioGetter: TwilioGetter) {
    const account_sid = twilioGetter.getTwilioAccountSid();
    const auth_token = twilioGetter.getTwilioAuthToken();
    this.twilioClient = Twilio(account_sid, auth_token);
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
    const verifyToken = this.twilioGetter.getTwilioVerificationSid();
    try {
      await this.twilioClient.verify.v2
        .services(verifyToken)
        .verifications.create({ to: receiverPhoneNumber, channel: 'sms' });
    } catch (err) {
      console.log(err);
      throw new Error(`${err}`);
    }
  }

  async checkVerifyCode(receiverPhoneNumber: string, code: string) {
    const verifyToken = this.twilioGetter.getTwilioVerificationSid();
    try {
      return await this.twilioClient.verify.v2
        .services(verifyToken)
        .verificationChecks.create({ to: receiverPhoneNumber, code: code });
    } catch (err) {
      console.log(err);
      throw new Error(`${err}`);
    }
  }
}
