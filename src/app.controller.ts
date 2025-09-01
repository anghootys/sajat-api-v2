import { Controller, Get } from '@nestjs/common';
import * as appService from './app.service';
import { CacheTTL } from '@nestjs/common/cache';

@Controller()
export class AppController {
  constructor(private readonly appService: appService.AppService) {}

  @Get('/ping')
  @CacheTTL(0) // stop cache on this api
  ping(): appService.IPong {
    return this.appService.ping();
  }
}
