import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../users/user.schema';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(password, user.password)) {      
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload: JwtPayload = {
      username: user.username,
      sub: user._id.toString(),  // Use the user's ID as `sub`
      email: user.email,  // Optional field
      roles: user.roles,  // User roles
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
