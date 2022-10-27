import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from "typeorm";
import { Skill } from "../skill/entities/skill.entity";
import { User } from "./entities/user.entity";
import { CrudService } from "../generics/service/crud.service";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService extends CrudService<User>{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {
    super(userRepository);
  }
}
