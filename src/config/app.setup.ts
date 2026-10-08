import { INestApplication, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import helmet from "helmet";

export const setupApp = (app: INestApplication): void => {
    const config = app.get(ConfigService);

    app.use(helmet);

    app.enableCors({
        origin: config.getOrThrow<string>('app.corsOrigin').split(',').map((origin) => origin.trim())
    })

    app.setGlobalPrefix('api/v1')

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true
        })
    )

    app.enableShutdownHooks()
}