import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwilioGetter {
  constructor(private readonly configService: ConfigService) {}

  getTwilioAccountSid() {
    // console.log(this.configService.get('twilio.twilio_account_sid'));
    return this.configService.get('twilio.twilio_account_sid');
  }

  getTwilioAuthToken() {
    // console.log(this.configService.get('twilio.twilio_auth_token'));
    return this.configService.get('twilio.twilio_auth_token');
  }

  getTwilioVerificationSid() {
    return this.configService.get('twilio.verification_sid');
  }

  getTwilioSendNumber() {
    return this.configService.get('twilio.twilio_sender_phone_number');
  }
}
