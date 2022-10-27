import { Body, Controller, Post } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { User } from "../user/entities/user.entity";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }
  @Post('register')
  register(@Body()registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }
  @Post('login')
  login(@Body()loginDto: LoginDto): Promise<User> {
    return this.authService.login(loginDto);
  }
}
