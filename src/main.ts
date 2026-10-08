import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { setupApp } from './config/app.setup.js';
import { swaggerConfiguration } from './config/swagger.config.js';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  setupApp(app)
  swaggerConfiguration(app)
  await app.listen(+app.get(ConfigService).getOrThrow<string>('app.port'));
}
await bootstrap();
