import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('personne')
export class PersonneEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  age: number;
}
