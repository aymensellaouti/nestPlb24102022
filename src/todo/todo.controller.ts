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

@Controller('todo')
export class TodoController {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly sayHelloService: SayHelloService,
    private readonly todoService: TodoService
  ) {}
  @Get()
  getTodos(@Req() request: Request): TodoModel[] {
    return this.todoService.getTodos();
  }
  @Post()
  addTodo(
    @Body() addTodoDto: AddTodoDto
    ): TodoModel {
    return this.todoService.addTodo(addTodoDto);
  }
  @Get(':id')
  getTodoById(@Param('id') id: string): TodoModel {
    return this.todoService.getTodoById(id);
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.deleteTodo(id);
   }
  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateTodo(id, updateTodoDto);
  }
}
