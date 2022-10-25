import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { secondMiddleware } from "./middleware/functions.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(secondMiddleware);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    // forbidNonWhitelisted: true
  }));
  await app.listen(3000);
}
bootstrap();
