import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { LoggerService } from "../services/logger.service";
import { SayHelloService } from "../services/say-hello/say-hello.service";
import { TodoService } from "./todo.service";
import { AuthMiddleware } from "./middleware/auth.middleware";

@Module({
  controllers: [TodoController],
  providers: [LoggerService, SayHelloService, TodoService]
})
export class TodoModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware)
      .forRoutes(
        {path: 'todo*', method: RequestMethod.PATCH},
        {path: 'todo', method: RequestMethod.POST},
        {path: 'todo*', method: RequestMethod.DELETE},
        {path: 'todo*', method: RequestMethod.PUT}
      )
  }
}{}
