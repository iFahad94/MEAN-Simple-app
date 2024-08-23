import { Module, forwardRef  } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt'; // Import JwtService here
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './user.schema';
import { AuthModule } from '../auth/auth.module';  // Import AuthModule
import { RolesGuard } from '../auth/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule,),
    JwtModule,
    ConfigModule // Importing MongooseModule and defining the User schema
  ],
  providers: [UsersService], // Register UsersService as a provider
  controllers: [UsersController], // Register UsersController
  exports: [UsersService], // Export UsersService for use in other modules
})
export class UsersModule {}
