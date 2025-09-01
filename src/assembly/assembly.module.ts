import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AssemblyController } from './assembly.controller';
import { ElectionService } from './election/election.service';
import { SharedModule } from '../shared/shared.module';
import { CacheLessMiddleware } from 'src/shared/chache-less/cache-less-middleware.service';

@Module({
  controllers: [AssemblyController],
  providers: [ElectionService],
  imports: [SharedModule],
})
export class AssemblyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CacheLessMiddleware).forRoutes('assembly/votes-count');
  }
}
