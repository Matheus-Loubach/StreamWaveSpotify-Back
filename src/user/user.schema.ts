import mongoose, { Schema, Document } from "mongoose";
import { DefaultSchemaOptions } from "../repositories/mongoose/default.schema";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true,
  }
}, DefaultSchemaOptions);


const userModel = mongoose.model<IUser>("User", UserSchema);

export default userModel

