import 'module-alias/register.js';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: 'https://sajat.corc.ir',
    methods: ['GET'],
  });

  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port);

  new Logger('Bootstrap').log(`Nest JS API Server started on port '${port}'.`);
}

void bootstrap();
