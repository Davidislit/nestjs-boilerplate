import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { hash } from 'bcrypt';

@Schema()
export class User extends Document {
  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, unique: true, required: true })
  username: string;

  @Prop({ type: String, required: true, select: false })
  password: number;

  @Prop({ type: Number, default: 0 })
  tokenVersion: number;
}

const userSchema = SchemaFactory.createForClass(User);

userSchema.pre<User>('save', async function(this: User, next) {
  const hashPassword = await hash(
    this.password,
    parseInt(process.env.SALT_ROUNDS),
  );
  this.password = hashPassword;
  next();
});

export default userSchema;
