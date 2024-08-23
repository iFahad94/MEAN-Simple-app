import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { Roles } from './user-role.enum'; // Import your UserRole enum
import { ROLES_KEY } from './roles.decorator'; // Adjust the path accordingly

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private jwtService: JwtService, 
    private configService: ConfigService,
    private usersService: UsersService,) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    console.log('Decoded Token:', token);

    if (token) {
      try {
        const decoded = this.jwtService.verify(token, {
          secret: this.configService.get<string>('JWT_SECRET'),
        });
        const userRoles = decoded.roles || [];
        return requiredRoles.some(role => userRoles.includes(role));
      } catch (error) {
        console.error('Token Verification Error: ', error);
        throw new ForbiddenException('RolesGuard ForbiddenException Invalid token');
      }
    }

    return false;
  }
}
