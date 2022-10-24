import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { LoggerService } from "../services/logger.service";
import { SayHelloService } from "../services/say-hello/say-hello.service";
import { TodoService } from './todo.service';

@Module({
  controllers: [TodoController],
  providers: [LoggerService, SayHelloService, TodoService]
})
export class TodoModule {}
