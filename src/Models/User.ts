enum Role { Admin, Player }
enum tipoEnsino { Secundario, Profissional }
enum gender { masc, fem }

interface User {
    name: string;
    email: string;
    username: string;
    password: string;
    score: number;
    gender: Enumerator;
    birdthday: Date;
    jogos: String[];
    confirmed: Boolean;
    confirmationToken: string;
    resetPasswordToken: string;
    resetPasswordExpires: string;
    role: Role;
}

interface Student {
    contabilidadeSecundario: number;
    contabilidadeSuperior: number;
    tipoEnsino: Enumerator;
    anosDeContabilidade: number;
    anosDeContabilidadeSuperior: number;
    mediaSecundario: number;
    mediaIngresso: number;
}

class User {
  constructor(
    name: string,
    email: string,
    username: string,
    password: string,
    score: number,
    gender: gender,
    birdthday: Date,
    jogos: String[],
    confirmed: Boolean,
    confirmationToken: string,
    resetPasswordToken: string,
    resetPasswordExpires: string,
    role: Role,
  ) {}
}
