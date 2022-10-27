import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';
import { User } from "../user/entities/user.entity";
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {
  }
  register(registerDto: RegisterDto): Promise<User> {
    return this.userService.create(registerDto);
  }

  async login(loginDto: LoginDto): Promise<User> {
    const {identifier, password} = loginDto;

  //  Vérifier que le user existe
    const user = await this.userService.findUSerByEmailOrUsername(identifier);
  //  Si oui on vérifie le password
    if (user) {
      const isAuthenticated = await bcrypt.compare(password, user.password);
      if (isAuthenticated) {
        delete user.password;
        return user;
      }
    }
    //     Si oui je lui renvoi le user sans le pwd
  //      Sinon on renvoi unauthorized
    throw new UnauthorizedException('Veuillez vérifier vos credentials');
  }

}
