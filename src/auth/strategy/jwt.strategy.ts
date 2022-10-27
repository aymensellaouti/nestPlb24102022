import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "../../user/user.service";
import { JwtPayloadDto } from "../dto/jwt-payload.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService
  ) {
    super({
      secretOrKey: 'secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  async validate(payload: JwtPayloadDto) {
  //  récupérer le user
    const {username} = payload;
    const user = await this.userService.findUSerByEmailOrUsername(username);
  //  si exist on le renvoi
    if (!user) {
      throw new UnauthorizedException('Vous devez vous authentifier');
    }
  //  sinon unauthorized
    return user;
  }
}
