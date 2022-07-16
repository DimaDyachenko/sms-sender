// Here we will catch every new phone number and set rate limit for verify request but have to connect smth like redis

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Twilio } from 'twilio';

export interface Response {
  data: any;
}

@Injectable()
export class VerifyInterceptor implements NestInterceptor {
  private twilioClient: Twilio;
  constructor(private readonly configService: ConfigService) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid, authToken);
  }
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Promise<Response>> {
    return next.handle().pipe(
      map(async (data) => {
        try {
          const verifySid = this.configService.get('VERIFICATION_SID');

          const createRateLimit = await this.twilioClient.verify.v2
            .services(verifySid)
            .rateLimits.create({
              description:
                'Limit verifications by number of requests and interval for requests',
              uniqueName: `rate_requests_per_minute_for_${data.phoneNumber}`,
            });

          await this.twilioClient.verify.v2
            .services(verifySid)
            .rateLimits(createRateLimit.sid)
            .buckets.create({ max: 4, interval: 60 });

          return { data };
        } catch (err) {
          throw new Error(`1 ${err.message}, ${err}`);
        }
      }),
    );
  }
}
