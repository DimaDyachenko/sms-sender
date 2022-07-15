import { IsString } from 'class-validator';

export class PhoneDTO {
  @IsString()
  phoneNumber: string;
}

export class VerifyCodeDTO {
  @IsString()
  phoneNumber: string;
  verifyCode: string;
}
