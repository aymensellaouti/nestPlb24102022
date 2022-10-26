import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TodoStatusEnum } from "../todo.model";
import { TimeStampEntity } from "../../generics/db/timestamp.entity";

@Entity('todo')
export class TodoEntity extends TimeStampEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    length: 10
  })
  name: string;
  @Column()
  description: string;
  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting
  })
  status: TodoStatusEnum;
}
