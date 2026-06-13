import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import 'reflect-metadata';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const corsOrigin = configService.get<string>('CORS_ORIGIN');

  if (corsOrigin) {
    const origins = corsOrigin.split(',').map((origin) => origin.trim());
    app.enableCors({
      origin: origins,
      credentials: true,
    });
  } else {
    app.enableCors();
  }

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = Number(process.env.PORT ?? 3030);
  await app.listen(port);
}

void bootstrap();
