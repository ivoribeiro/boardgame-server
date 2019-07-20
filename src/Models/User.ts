import mongoose, { Document, Schema } from "mongoose";
import { IGame } from "./Game";

enum Role { Admin, Player }
enum tipoEnsino { Secundario, Profissional }
enum Gender { masc, fem }

export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  score: number;
  gender: Gender;
  birdthday?: Date;
  jogos: IGame[];
  confirmed: boolean;
  confirmationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: number;
  role: Role;
}

interface IStudent extends IUser {
  contabilidadeSecundario: number;
  contabilidadeSuperior: number;
  tipoEnsino: Enumerator;
  anosDeContabilidade: number;
  anosDeContabilidadeSuperior: number;
  mediaSecundario: number;
  mediaIngresso: number;
}

const UserSchema: Schema = new Schema({
  anosDeContabilidade: Number,
  anosDeContabilidadeSuperior: Number,
  confirmationToken: String,
  confirmed: Boolean,
  contabilidadeSecundario: Boolean,
  contabilidadeSuperior: Boolean,
  dataNascimento: Date,
  email: {
    required: true,
    type: String,
    unique: true,
  },
  games: [{
    ref: "Game",
    type: mongoose.Schema.Types.ObjectId,
  }],
  gender: String,
  mediaIngresso: String,
  mediaSecundario: String,
  name: String,
  password: String,
  resetPasswordExpires: Date,
  resetPasswordToken: String,
  role: String,
  score: Number,
  tipoEnsino: String,
  username: {
    required: true,
    type: String,
    unique: true,
  },
});

// Export the model and return your IUser interface
export default mongoose.model<IUser>("User", UserSchema);
