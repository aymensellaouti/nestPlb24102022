import { IsEmail, IsString } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  username: string;
  @IsString()
  password: string;
}
