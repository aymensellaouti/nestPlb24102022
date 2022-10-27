import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from "../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    // Penser à utiliser le registerAsync
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: 3600
      }
    })
  ]
})
export class AuthModule {}
