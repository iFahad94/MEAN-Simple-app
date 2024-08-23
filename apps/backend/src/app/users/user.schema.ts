import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Roles } from '../auth/user-role.enum'; // Adjust the import path as needed

export type UserRole = 'admin' | 'user';
export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: [String], enum: Roles, default: ['user'] })
  roles: UserRole[];
}

export const UserSchema = SchemaFactory.createForClass(User);