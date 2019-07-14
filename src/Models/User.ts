import { IGame } from "./Game";

enum Role { Admin, Player }
enum tipoEnsino { Secundario, Profissional }
enum Gender { masc, fem }

export interface IUser {
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
  resetPasswordExpires?: string;
  role: Role;
}

interface IStudent {
  contabilidadeSecundario: number;
  contabilidadeSuperior: number;
  tipoEnsino: Enumerator;
  anosDeContabilidade: number;
  anosDeContabilidadeSuperior: number;
  mediaSecundario: number;
  mediaIngresso: number;
}

export default class User implements IUser {
  public name: string;
  public email: string;
  public username: string;
  public password: string;
  public score: number;
  public gender: Gender;
  public birthday?: Date;
  public jogos: IGame[];
  public confirmed: boolean;
  public confirmationToken?: string;
  public resetPasswordToken?: string;
  public resetPasswordExpires?: string;
  public role: Role;

  constructor(name: string, email: string, username: string, password: string, gender: Gender, birthday: Date) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.password = password;
    this.gender = gender;
    this.birthday = birthday;
  }
}
