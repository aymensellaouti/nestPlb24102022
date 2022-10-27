import { Injectable, UnauthorizedException } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "../user/user.service";
import { LoginDto } from "./dto/login.dto";
import * as bcrypt from 'bcrypt';
import { User } from "../user/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { LoginResponseDto } from "./dto/login-response.dto";
import { JwtPayloadDto } from "./dto/jwt-payload.dto";
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {
  }
  register(registerDto: RegisterDto): Promise<User> {
    return this.userService.create(registerDto);
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const {identifier, password} = loginDto;

  //  Vérifier que le user existe
    const user = await this.userService.findUSerByEmailOrUsername(identifier);
  //  Si oui on vérifie le password
    if (user) {
      const isAuthenticated = await bcrypt.compare(password, user.password);
      if (isAuthenticated) {
        const payload: JwtPayloadDto = {
          username: user.username,
          email: user.email,
          role: user.role
        }

        return {jwt : this.jwtService.sign(payload)};
      }
    }
    //     Si oui je lui renvoi le user sans le pwd
  //      Sinon on renvoi unauthorized
    throw new UnauthorizedException('Veuillez vérifier vos credentials');
  }

}
