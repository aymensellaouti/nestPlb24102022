import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) {
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const className = context.getClass();
    const handlerName = context.getHandler();
    const user = request.user;
    const allowedRoles = this.reflector
      .getAllAndMerge('roles', [className, handlerName]) ;
    return allowedRoles.includes(user.role);
  }
}
