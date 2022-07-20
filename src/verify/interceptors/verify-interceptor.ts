import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Twilio from 'twilio';

export interface Response {
  data: any;
}

@Injectable()
export class VerifyInterceptor implements NestInterceptor {
  private twilioClient;

  constructor(private readonly configService: ConfigService) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');

    this.twilioClient = Twilio(accountSid, authToken);
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

          // this.twilioClient.lookups.v1
          //   .phoneNumbers(response.phone)
          //   .fetch({ addOns: ['ekata_phone_valid'] })
          //   .then((phone_number) =>
          //     console.log(phone_number.addOns.results.ekata_phone_valid),
          //   );

          // this method let us to see info about
          // this.twilioClient.lookups.v1
          //   .phoneNumbers(response.phone)
          //   .fetch({ addOns: ['marchex_cleancall'] })
          //   .then((phone_number) =>
          //     console.log(phone_number.addOns.results.marchex_cleancall),
          //   );

          return { data };
        } catch (err) {
          throw err;
        }
      }),
    );
  }
}
