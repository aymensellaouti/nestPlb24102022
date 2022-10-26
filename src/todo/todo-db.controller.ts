import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Res
} from "@nestjs/common";
import { TodoModel } from "./todo.model";
import { Request, Response } from "express";
import {v4 as uuidV4} from 'uuid';
import { AddTodoDto } from "./dto/add-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { LoggerService } from "../services/logger.service";
import { SayHelloService } from "../services/say-hello/say-hello.service";
import { TodoService } from "./todo.service";
import { TodoEntity } from "./entity/todo.entity";

@Controller({
  path: 'todo',
  version: '2'
})
export class TodoDbController {
  constructor(
    private readonly todoService: TodoService
  ) {}
  @Get()
  getTodos(@Req() request: Request): TodoModel[] {
    return this.todoService.getTodos();
  }
  @Post()
  addTodo(
    @Body() addTodoDto: AddTodoDto
    ): Promise<TodoEntity> {
    return this.todoService.create(addTodoDto);
  }
  @Get(':id')
  getTodoById(@Param('id') id: string): TodoModel {
    return this.todoService.getTodoById(id);
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: string,
             @Req() request: Request
  ) {
    return this.todoService.deleteTodo(id, request['user']);
   }
  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.todoService.update(id, updateTodoDto);
  }
}
