import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimeStampEntity } from "../../generics/db/timestamp.entity";
@Entity('skill')
export class Skill extends TimeStampEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false
  })
  designation: string = null;
}
