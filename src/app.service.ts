import { Injectable } from '@nestjs/common';

export interface IPong {
  timestamp: number;
}

@Injectable()
export class AppService {
  ping(): IPong {
    return {
      timestamp: Date.now(),
    };
  }
}
