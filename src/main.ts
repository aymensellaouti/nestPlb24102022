import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { secondMiddleware } from "./middleware/functions.middleware";
import * as morgan from 'morgan';
import helmet from 'helmet';
import { TimeInterceptor } from "./interceptors/time-interceptor";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(secondMiddleware);
  app.enableCors({origin: ['http://localhost:4200','http://localhost:4201']});
  app.use(morgan('dev'));
  app.use(helmet());
  app.useGlobalInterceptors(new TimeInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    // forbidNonWhitelisted: true
  }));
  await app.listen(3000);
}
bootstrap();
