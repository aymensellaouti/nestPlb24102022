import { ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TodoModel } from "./todo.model";
import { AddTodoDto } from "./dto/add-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";

@Injectable()
export class TodoService {
  constructor(
    @Inject('uuid')
    private uuid
  ) {}
  todos: TodoModel[] = [];
  getTodos(): TodoModel[] {
    return this.todos;
  }
  addTodo(addTodoDto: AddTodoDto): TodoModel {
    const { name, description, userId } =  addTodoDto;
    const newTodo = new TodoModel( this.uuid(),name, description, userId);
    this.todos.push(newTodo);
    return newTodo;
  }
  getTodoById(id: string): TodoModel {
    return this.todos[this.findTodoById(id)];
  }
  deleteTodo(id: string, userId: number) {
    const index = this.findTodoById(id);
    if (this.todos[index].userId != userId) {
      throw new ForbiddenException('');
    }
    this.todos.splice(index, 1);
    return {count : 1};
  }
  updateTodo(id: string, updateTodoDto: UpdateTodoDto, userId: number) {
    const todo = this.todos[this.findTodoById(id)];
    if (todo.userId != userId) {
      throw new ForbiddenException('');
    }
    this.todos[this.findTodoById(id)] = {...todo, ...updateTodoDto};
    return this.todos[this.findTodoById(id)];
  }
  private findTodoById(id: string): number {
    const index = this.todos.findIndex((todo) => {
      return (todo.id === id);
    });
    if (index === -1) {
      throw new NotFoundException('Todo innexistant');
    }
    return index;
  }
}
