import { Global, Module } from '@nestjs/common';
import { SajatDataSourceService } from './data_source/sajat-data-source/sajat-data-source.service';

@Global()
@Module({
  providers: [SajatDataSourceService],
  exports: [SajatDataSourceService],
})
export class SharedModule {}
