import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from "express";

import { ROLES_KEY } from "./roles-auth.decorator";
import { RoleType } from "src/roles/roles.model";
import { User } from "src/users/users.model";


@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest<Request>();
      const authHeader = req.headers.authorization || '';
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User unauthorized' });
      }
      const user: User = this.jwtService.verify(token);
      const isAccess = user.roles.some(role => requiredRoles.includes(role.type));

      if (!isAccess) {
        throw new ForbiddenException({ message: 'No access' });
      }

      return isAccess;

    } catch (err) {
      throw new HttpException(
        err?.message || 'No access',
        err?.status || HttpStatus.FORBIDDEN,
      );
    }
  }
}