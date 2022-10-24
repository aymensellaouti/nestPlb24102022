import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { TodoModel } from "./todo.model";
import { Request } from "express";
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
  addTodo(@Body() todo: Partial<TodoModel>): TodoModel {
    const { name, description } =  todo;
    const newTodo = new TodoModel( uuidV4(),name, description);
    this.todos.push(newTodo);
    return newTodo;
  }
}
