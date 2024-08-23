import { Module, forwardRef  } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenBlacklistService } from './token-blacklist.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '8h' },
      }),
    }),
    ConfigModule,
    forwardRef(() => UsersModule)
  ],
  providers: [AuthService, TokenBlacklistService],
  exports: [AuthService, TokenBlacklistService]
})
export class AuthModule {}
