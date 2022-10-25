import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TestController } from './test.controller';
import { FirstMiddleware } from "../middleware/first.middleware";
import { secondMiddleware, T1Middleware } from "../middleware/functions.middleware";

@Module({
  controllers: [TestController]
})
export class TestModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(T1Middleware)
      .forRoutes('')
  }
}{}
