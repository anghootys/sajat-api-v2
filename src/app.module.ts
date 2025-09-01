import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AssemblyModule } from './assembly/assembly.module';
import { SajatDataSourceService } from './shared/data_source/sajat-data-source/sajat-data-source.service';
import { CacheLessMiddleware } from './shared/chache-less/cache-less-middleware.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AssemblyModule,
  ],
  controllers: [AppController],
  providers: [AppService, SajatDataSourceService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CacheLessMiddleware).forRoutes('ping');
  }
}
