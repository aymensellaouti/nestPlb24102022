import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from "typeorm";
import { Skill } from "../skill/entities/skill.entity";
import { User } from "./entities/user.entity";
import { CrudService } from "../generics/service/crud.service";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterDto } from "../auth/dto/register.dto";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService extends CrudService<User>{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {
    super(userRepository);
  }

  async create(registerDto: RegisterDto): Promise<User> {
    // encrypter le mdp
    const { password } = registerDto;
    const salt = await bcrypt.genSalt();
    registerDto.password = await bcrypt.hash(password, salt);
    // renvoyer le user sans mdp
    try {
      const user = await super.create(registerDto);
      delete user.password;
      return user;
    } catch (e) {
      throw new BadRequestException(`email ou username déjà existant`);
    }
  }

  findUSerByEmailOrUsername(identifier: string): Promise<User> {
    return this.userRepository.findOne({
      where: [{email: identifier}, {username: identifier}]
    });
  }
}
