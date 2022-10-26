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
  Post, Query,
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
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { SearchTodoDto } from "./dto/search-todo.dto";
import { PaginateDto } from "../generics/dto/paginate.dto";
import { DateIntervalDto } from "../generics/dto/date-interval.dto";
import { StatsStatusDto } from "./dto/stats-status.dto";

@Controller({
  path: 'todo',
  version: '2'
})
export class TodoDbController {
  constructor(
    private readonly todoService: TodoService
  ) {}
  @Get()
  getTodos(@Query() searchTodoDto: SearchTodoDto): Promise<TodoEntity[]> {
    return this.todoService.findAll(searchTodoDto);
  }
  @Get('qb')
  getTodosQB(@Query() paginateDto: PaginateDto): Promise<TodoEntity[]> {
    return this.todoService.findQB(paginateDto);
  }
  @Post()
  addTodo(
    @Body() addTodoDto: AddTodoDto
    ): Promise<TodoEntity> {
    return this.todoService.create(addTodoDto);
  }
  @Get(':id')
  getTodoById(@Param('id') id: string): Promise<TodoEntity> {
    return this.todoService.findOne(id);
  }
  @Get('/stats/status')
  getStats(@Query() dateIntervalDto: DateIntervalDto): Promise<StatsStatusDto[]> {
    return this.todoService.statsTodoStatus(dateIntervalDto);
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: string): Promise<UpdateResult> {
    return this.todoService.delete(id);
   }
  @Patch('restore/:id')
  restoreTodo(@Param('id') id: string): Promise<UpdateResult> {
    return this.todoService.restore(id);
  }
  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.todoService.update(id, updateTodoDto);
  }
}
