import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const ERR_DATA_SOURCE_NOT_INITIALIZED =
  'Data Source Not Initialized Successfully.';

declare type DataSource_t = 'mssql';

@Injectable()
export class SajatDataSourceService
  extends DataSource
  implements OnApplicationBootstrap
{
  private readonly log = new Logger('SajatDataSourceService');

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

  async onApplicationBootstrap() {
    try {
      await this.initialize();
      if (this.isInitialized) {
        this.log.log('Connected to DB Successfully!');
      } else {
        this.log.fatal('Connection to DB was not initialized successfully.');
        throw new Error(ERR_DATA_SOURCE_NOT_INITIALIZED);
      }
    } catch (e) {
      this.log.fatal(e);
      throw e;
    }
  }
}
