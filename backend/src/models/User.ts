import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  surname: string;
}

const userSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
});

export default mongoose.model<IUser>('User', userSchema);
