import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { LoggerService } from "../services/logger.service";
import { SayHelloService } from "../services/say-hello/say-hello.service";
import { TodoService } from "./todo.service";
import { AuthMiddleware } from "./middleware/auth.middleware";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./entity/todo.entity";
import { TodoDbController } from "./todo-db.controller";

@Module({
  controllers: [TodoController, TodoDbController],
  providers: [LoggerService, SayHelloService, TodoService],
  imports: [TypeOrmModule.forFeature([TodoEntity])]
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
