import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {ConfigService} from '@nestjs/config'
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const here = dirname(fileURLToPath(import.meta.url));

export const databaseConfiguration = (
    config: ConfigService,
): TypeOrmModuleOptions => {
    const isTest = config.getOrThrow<string>('app.env') === 'test'

    return {
        type: 'postgres',
        host: config.getOrThrow<string>('database.host'),
        port: config.getOrThrow<number>('database.port'),
        username: config.getOrThrow<string>('database.user'),
        password: config.getOrThrow<string>('database.password'),
        database: config.getOrThrow<string>('database.name'),
        autoLoadEntities: true,
        synchronize: false,

        logging:
            config.get<string>('app.env') === 'development'
            ? ['error', 'warn', 'schema', 'migration']
            : ['error'],

        migrations: isTest
            ? []
            : [join(here, '..', 'database', 'migrations', '*.{ts,js}')],
        migrationsRun: !isTest,
        migrationsTableName: 'migrations',
        migrationsTransactionMode: 'each'

    }
}