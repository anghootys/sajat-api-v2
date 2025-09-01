import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AssemblyModule } from './assembly/assembly.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AssemblyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
