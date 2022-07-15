import { Controller, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getHello(@Req() request): string {
    console.log(request);

    return this.appService.getHello();
  }
}
