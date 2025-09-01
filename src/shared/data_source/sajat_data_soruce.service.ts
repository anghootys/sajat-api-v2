import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

declare type DataSource_t = 'mssql';

@Injectable()
export class SajatDataSource extends DataSource {
  constructor(configService: ConfigService) {
    super({
      type: configService.get<DataSource_t>('DB_DRIVER')!,
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
      synchronize: false,
    });
  }
}
