import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TodoController } from './todo.controller';
import { LoggerService } from "../services/logger.service";
import { SayHelloService } from "../services/say-hello/say-hello.service";
import { TodoService } from './todo.service';
import { T1Middleware, T2Middleware } from "../middleware/functions.middleware";

@Module({
  controllers: [TodoController],
  providers: [LoggerService, SayHelloService, TodoService]
})
export class TodoModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(T2Middleware)
      .forRoutes('')
  }
}{}
