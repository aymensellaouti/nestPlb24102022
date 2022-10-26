import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { secondMiddleware } from "./middleware/functions.middleware";
import * as morgan from "morgan";
import helmet from "helmet";
import * as dotenv from "dotenv";
import { TimeInterceptor } from "./interceptors/time-interceptor";
import { ConfigService } from "@nestjs/config";

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(secondMiddleware);
  app.enableCors({origin: ['http://localhost:4200','http://localhost:4201']});
  app.use(morgan('dev'));
  app.use(helmet());
  app.enableVersioning({
    type: VersioningType.URI
  })
  app.useGlobalInterceptors(new TimeInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    // forbidNonWhitelisted: true
  }));
  const configService = app.get<ConfigService>(ConfigService);
  console.log('Port = ', configService.get('PORT'));
  console.log('NODE_ENV',process.env.NODE_ENV);
  await app.listen(configService.get('PORT'));
}
bootstrap();
