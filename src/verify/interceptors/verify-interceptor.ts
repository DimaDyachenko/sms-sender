import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TwilioGetter } from '../../lib/config/TwilioGetter';
import Twilio from 'twilio';

export interface Response {
  data: any;
}

@Injectable()
export class VerifyInterceptor implements NestInterceptor {
  private twilioClient;

  constructor(private readonly twilioGetter: TwilioGetter) {
    const account_sid = twilioGetter.getTwilioAccountSid();
    const auth_token = twilioGetter.getTwilioAuthToken();
    this.twilioClient = Twilio(account_sid, auth_token);
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Promise<Response>> {
    return next.handle().pipe(
      map(async (data) => {
        try {
          const response = JSON.parse(data);
          const phoneNumberDetails = await this.twilioClient.lookups.v1
            .phoneNumbers(response.phone)
            .fetch({ type: ['carrier'] });

          if (phoneNumberDetails.carrier.type === 'voip') {
            throw new HttpException(
              'Number is invalid please send valid phone number',
              400,
            );
          }

          // could be moved to guard and test there
          // const verifySid = this.configService.get('VERIFICATION_SID');

          // const createRateLimit = await this.twilioClient.verify.v2
          //   .services(verifySid)
          //   .rateLimits.create({
          //     description:
          //       'Limit verifications by number of requests and interval for requests',
          //     uniqueName: `rate_requests_per_minute_for_${data.phoneNumber}`,
          //   });

          // await this.twilioClient.verify.v2
          //   .services(verifySid)
          //   .rateLimits(createRateLimit.sid)
          //   .buckets.create({ max: 4, interval: 60 });

          // this.twilioClient.lookups.v2
          //   .phoneNumbers(response.phone)
          //   .fetch({ fields: 'live_activity' })
          //   .then((phone_number) => console.log(phone_number));

          // const phoneNumberDetails = await this.twilioClient.lookups.v1
          //   .phoneNumbers(response.phone)
          //   .fetch({ addOns: ['ekata_phone_valid'] });

          // console.log(
          //   phoneNumberDetails.addOns.results.ekata_phone_valid.result,
          // );
          // {
          //   phone_number: '5417083275',
          //   warnings: [],
          //   error: null,
          //   country_calling_code: '1',
          //   is_valid: true,
          //   line_type: 'NonFixedVOIP',
          //   country_code: 'US',
          //   carrier: 'Onvoy/3',
          //   country_name: 'United States',
          //   id: 'Phone.43176fef-a2e1-4b08-cfe3-bc7128b685c4',
          //   is_prepaid: false
          // }

          // this method let us to see info about
          // const phoneNumberDetails = await this.twilioClient.lookups.v1
          //   .phoneNumbers(response.phone)
          //   .fetch({ addOns: ['marchex_cleancall'] });
          //
          // console.log(phoneNumberDetails.addOns.results.marchex_cleancall);
          //
          // {
          //   status: 'successful',
          //       request_sid: 'XR5134bfe9d3c6d88bf6516ed6781110a6',
          //     message: null,
          //     code: null,
          //     result: { result: { reason: 'CleanCall', recommendation: 'PASS' } }
          // }

          return { data };
        } catch (err) {
          throw err;
        }
      }),
    );
  }
}
