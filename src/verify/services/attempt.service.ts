import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export default class AttemptService {
  private twilioClient: Twilio;

  constructor(private readonly configService: ConfigService) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async checkFreeAttempts(verifyCode) {
    // const verifyToken = this.configService.get('VERIFICATION_SID');
    // const maxAttempts = 3;
    // let numberOfAttempts = 0;
  }
}
