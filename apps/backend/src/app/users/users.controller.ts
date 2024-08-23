import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  UnauthorizedException,
  Req
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.schema';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ROLES } from '../auth/roles.decorator';
import { Roles } from '../auth/user-role.enum';
import { RolesGuard } from '../auth/roles.guard';
import { TokenBlacklistService } from '../auth/token-blacklist.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly tokenBlacklistService: TokenBlacklistService
  ) { }

  // Registration Endpoint: Create a New User
  @Post()
  async create(@Body() createUserDto: Partial<User>): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  // Login Endpoint: Authenticate User and Return JWT Token
  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return this.authService.login(user);
  }

  // Get All Users: Restricted to Admin Role
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ROLES(Roles.Admin)
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req): { message: string } {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      this.tokenBlacklistService.add(token);
    }
    return { message: 'Logged out successfully' };
  }
}
