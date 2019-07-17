"use strict";
import { default as Config } from "../Config";
import { IUser } from "../Models/User";
import { email as Email, hash as Hash } from "../Services";

export interface IUserLogic {
    register(user: IUser): Promise<IUser>;
    confirm(confirmationToken: string): IUser;
    recoverPassword(email: string): IUser;
    resetPassword(resetPasswordToken: string, password: string): IUser;
}
export default class UserLogic implements IUserLogic {
    public async register(user: IUser): Promise<IUser> {
        // const exists = await exist(user.username, user.email);
        // if (!exists) {
        user.password = await Hash.hash(user.password);
        const hostPort = Config.site.hostPort ? ":" + Config.site.hostPort : "";
        const unconfirmedUser = await user.save()
        const from = Config.email.fromEmail;
        const to = unconfirmedUser.email;
        const subject = "Confirmação de registo";
        const html = "<b>Bem vindo " + unconfirmedUser.username + ', </b><a> use o seguinte <a href="http://' + Config.site.host + hostPort + "/confirmar/" + unconfirmedUser.confirmationToken + '"' + ">link</a> para confirmar a sua conta e começar a jogar!</p>";
        const text = "Bem vindo " + unconfirmedUser.username + ",use o seguinte link:" + Config.site.host + hostPort + "/confirmar/" + unconfirmedUser.confirmationToken + "para confirmar a sua conta e começar a jogar!";
        Email.sendMail(from, to, subject, html, text);
        return unconfirmedUser;
        // } else {
        //   throw new CustomError('ALREADY_EXISTING_USER', 400, 'The user already exists')
    }

    public confirm(confirmationToken: string): IUser {
        throw new Error("Method not implemented.");
    }
    public recoverPassword(email: string): IUser {
        throw new Error("Method not implemented.");
    }
    public resetPassword(resetPasswordToken: string): IUser {
        throw new Error("Method not implemented.");
    }

}
