import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, model, Types } from 'mongoose';
import { compare, hash } from 'bcryptjs';
import {
  mongoosePaginationPlugin,
  PaginateOptions,
  PaginateResult,
} from '../../shared/plugins/mongoose';

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, default: false })
  verified: boolean;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['admin', 'user'], default: 'user' })
  role: string;

  createdAt: Date;
  updatedAt: Date;

  comparePassword: (candidatePassword: string) => Promise<boolean>;
  save: () => Promise<User>;
  static paginate: (
    query: any,
    options: PaginateOptions,
  ) => Promise<PaginateResult<UserDocument>>;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(mongoosePaginationPlugin);

UserSchema.methods.comparePassword = function (
  candidatePassword: string,
): Promise<boolean> {
  return compare(candidatePassword, this.password);
};

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }
  next();
});

export const UserModel = model('user', UserSchema);
