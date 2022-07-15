import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';

export class GenerateResponse {
  status: MessageInstance;
  phone: string;
  message: string;

  constructor(status: MessageInstance, phone: string) {
    this.status = status;
    this.phone = phone;
    this.message = `Sms was sent successfully`;
  }
}

export class VerifyCodeSendResponse {
  phone: string;
  message: string;

  constructor(phone: string) {
    this.phone = phone;
    this.message = `Verify code was sent successfully`;
  }
}

export class VerifyCodeCheckedResponse {
  status: string;
  phone: string;
  message: string;
  constructor(status: string, phone: string) {
    this.status = status;
    this.phone = phone;
    this.message = 'Verification passed';
  }
}
