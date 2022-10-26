import { Body, ForbiddenException, Inject, Injectable, NotFoundException, Param } from "@nestjs/common";
import { TodoModel } from "./todo.model";
import { AddTodoDto } from "./dto/add-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { Equal, ILike, Repository } from "typeorm";
import { TodoEntity } from "./entity/todo.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { SearchTodoDto } from "./dto/search-todo.dto";

@Injectable()
export class TodoService {
  constructor(
    @Inject("uuid")
    private uuid,
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>
  ) {
  }

  todos: TodoModel[] = [];

  // Db
  //Add Todo
  create(addTodoDto: AddTodoDto): Promise<TodoEntity> {
    return this.todoRepository.save(addTodoDto);
  }
  // Update Todo
  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const todo = await this.todoRepository.preload({id, ...updateTodoDto});
    if (!todo) {
      throw new NotFoundException('Todo innexistant');
    }
    return this.todoRepository.save(todo);
  }
  // soft delete
  async delete(id: string): Promise<UpdateResult> {
    const result = await this.todoRepository.softDelete(id);
    if(! result.affected) {
      throw new NotFoundException('Todo innexistant');
    }
    return result;
  }
  // restore
  async restore(id: string): Promise<UpdateResult> {
    const result = await this.todoRepository.restore(id);
    if(! result.affected) {
      throw new NotFoundException('Todo innexistant');
    }
    return result;
  }

  // In Memory
  getTodos(): TodoModel[] {
    return this.todos;
    // this.todoRepository.
  }

  addTodo(addTodoDto: AddTodoDto): TodoModel {
    const { name, description, userId } = addTodoDto;
    const newTodo = new TodoModel(this.uuid(), name, description, userId);
    this.todos.push(newTodo);
    return newTodo;
  }

  getTodoById(id: string): TodoModel {
    return this.todos[this.findTodoById(id)];
  }

  deleteTodo(id: string, userId: number) {
    const index = this.findTodoById(id);
    if (this.todos[index].userId != userId) {
      throw new ForbiddenException("");
    }
    this.todos.splice(index, 1);
    return { count: 1 };
  }

  updateTodo(id: string, updateTodoDto: UpdateTodoDto, userId: number) {
    const todo = this.todos[this.findTodoById(id)];
    if (todo.userId != userId) {
      throw new ForbiddenException("");
    }
    this.todos[this.findTodoById(id)] = { ...todo, ...updateTodoDto };
    return this.todos[this.findTodoById(id)];
  }

  private findTodoById(id: string): number {
    const index = this.todos.findIndex((todo) => {
      return (todo.id === id);
    });
    if (index === -1) {
      throw new NotFoundException("Todo innexistant");
    }
    return index;
  }

  findAll(searchTodoDto: SearchTodoDto): Promise<TodoEntity[]> {
    const where = [];
    const {search, status} = searchTodoDto;
    if (search) {
      where.push({name: ILike(`%${search}%`)});
      where.push({description: ILike(`%${search}%`)});
    }
    if (status) {
      where.push({status: Equal(status)})
    }
    return this.todoRepository.find(where.length? {where}: {});
  }

  async findOne(id: string): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({where: {id}});
    if (!todo) {
      throw new NotFoundException('Todo innexistant');
    }
    return todo;
  }
}
