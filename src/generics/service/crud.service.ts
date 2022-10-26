import { AddTodoDto } from "../../todo/dto/add-todo.dto";
import { TodoEntity } from "../../todo/entity/todo.entity";
import { UpdateTodoDto } from "../../todo/dto/update-todo.dto";
import { NotFoundException } from "@nestjs/common";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { SearchTodoDto } from "../../todo/dto/search-todo.dto";
import { Equal, ILike, Repository } from "typeorm";
import { HasIdInterface } from "../interface/has-id.interface";

export class CrudService <Entity extends HasIdInterface> {

  constructor(
    private readonly repository:Repository<Entity>
  ) {}
  findAll(): Promise<Entity[]> {
    return this.repository.find();
  }
  async findOne(id): Promise<Entity> {
    const todo = await this.repository.findOne({where: {id}});
    if (!todo) {
      throw new NotFoundException('Todo innexistant');
    }
    return todo;
  }
  create(addDto): Promise<Entity> {
    return this.repository.save(addDto);
  }
  // Update Todo
  async update(id: string, updateDto): Promise<Entity> {
    const todo = await this.repository.preload({id, ...updateDto});
    if (!todo) {
      throw new NotFoundException('Not Found');
    }
    return this.repository.save(todo);
  }
  // soft delete
  async delete(id: string): Promise<UpdateResult> {
    const result = await this.repository.softDelete(id);
    if(! result.affected) {
      throw new NotFoundException('Not Found');
    }
    return result;
  }
  // restore
  async restore(id: string): Promise<UpdateResult> {
    const result = await this.repository.restore(id);
    if(! result.affected) {
      throw new NotFoundException('Not Found');
    }
    return result;
  }

}
