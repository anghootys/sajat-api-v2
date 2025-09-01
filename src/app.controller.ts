import { Controller, Get } from '@nestjs/common';
import * as appService from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: appService.AppService) {}

  @Get()
  ping(): appService.IPong {
    return this.appService.ping();
  }
}
