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

@Controller('todo')
export class TodoController {
  todos: TodoModel[] = [];
  @Get()
  getTodos(@Req() request: Request): TodoModel[] {
    console.log(request);
    return this.todos;
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  addTodo(
    @Body() todo: Partial<TodoModel>,
    @Res() reponse: Response
    ): TodoModel {
    const { name, description } =  todo;
    const newTodo = new TodoModel( uuidV4(),name, description);
    this.todos.push(newTodo);
    // reponse
    //   .status(203)
    //   .json(newTodo)
    //   .end();
    //   return;
    return newTodo;
  }
  @Get(':id')
  getTodoById(@Param('id') id: string): TodoModel {
    return this.todos[this.findTodoById(id)];
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    const index = this.findTodoById(id);
    this.todos.splice(index, 1);
    return {count : 1};
  }
  @Patch(':id')
  updateTodo(@Param() id: string, @Body() partialTodo: Partial<TodoModel>) {
    const todo = this.todos[this.findTodoById(id)];
    this.todos[this.findTodoById(id)] = {...todo, ...partialTodo};
  }
  private findTodoById(id: string): number {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new NotFoundException('Todo innexistant');
    }
    return index;
  }
}
