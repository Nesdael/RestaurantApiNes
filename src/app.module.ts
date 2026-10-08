import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfig } from './config/env.config.js';
import { validateEnv } from './config/env.validations.schema.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfiguration } from './config/database.config.js';
import { TablesModule } from './modules/tables/tables.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
      load: [EnvConfig],
      validate: validateEnv
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfiguration
    }),

    ObserveModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.getOrThrow('observe')
      })
    }),

    TablesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
