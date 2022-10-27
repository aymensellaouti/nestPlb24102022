import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cv } from "../../cv/entities/cv.entity";

export enum UserRoleEnum {
  user = 'user',
  admin = 'admin'
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  username: string;
  @Column({
    unique: true
  })
  email: string;
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.user
  })
  role: UserRoleEnum;
  @OneToMany(
    () => Cv,
    (cv:Cv) => cv.user
  )
  cvs: Cv[];

}
