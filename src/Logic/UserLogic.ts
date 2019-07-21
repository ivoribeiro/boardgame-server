"use strict";
import { IUserDbAdapter } from "../Adapters/UserDbAdapter";
import { default as Config } from "../Config";
import HttpException from "../Exceptions/HttpException";
import { IUser } from "../Models/User";
import { email as Email, hash as Hash } from "../Services";
import * as Utils from "../Utils";

export interface IUserLogic {
    userDbAdapter: IUserDbAdapter;
    register(user: IUser): Promise<IUser>;
    confirm(confirmationToken: string): Promise<IUser>;
    recoverPassword(email: string): Promise<IUser>;
    resetPassword(resetPasswordToken: IUser["resetPasswordToken"], password: IUser["password"]): Promise<IUser>;
}
export default class UserLogic implements IUserLogic {
    public userDbAdapter: IUserDbAdapter;

    constructor(userDbAdapter: IUserDbAdapter) {
        this.userDbAdapter = userDbAdapter;
    }

    public async register(user: IUser): Promise<IUser> {
        const exists = await this.alreadyExist(user.email, user.username);
        if (!exists) {
            user.password = await Hash.hash(user.password);
            user.confirmationToken = Utils.makeid() + new Date().getTime();
            const hostPort = Config.site.hostPort ? ":" + Config.site.hostPort : "";
            const unconfirmedUser = await this.userDbAdapter.create(user);
            const from = Config.email.fromEmail;
            const to = unconfirmedUser.email;
            const subject = "Confirmação de registo";
            const html = "<b>Bem vindo " + unconfirmedUser.username + ', </b><a> use o seguinte <a href="http://' + Config.site.host + hostPort + "/confirmar/" + unconfirmedUser.confirmationToken + '"' + ">link</a> para confirmar a sua conta e começar a jogar!</p>";
            const text = "Bem vindo " + unconfirmedUser.username + ",use o seguinte link:" + Config.site.host + hostPort + "/confirmar/" + unconfirmedUser.confirmationToken + "para confirmar a sua conta e começar a jogar!";
            Email.sendMail(from, to, subject, html, text);
            return unconfirmedUser;
        } else {
            throw new HttpException(400, "ALREADY_EXISTING_USER,The user already exists");
        }
    }

    public async confirm(confirmationToken: string): Promise<IUser> {
        const user = await this.userDbAdapter.getByConfirmationToken(confirmationToken);
        if (user) {
            if (!user.confirmed) {
                user.confirmed = true;
                return this.userDbAdapter.updateUser(user);
            } else {
                throw new HttpException(400, "USER_ALREADY_CONFIRMED, The user was already confirmed");
            }
        } else {
            throw new HttpException(404, "CONFIRMATION_TOKEN_NOT_FOUND, The provided confirmation token dont exists");
        }
    }
    public async recoverPassword(email: string): Promise<IUser> {
        const user = await this.userDbAdapter.getByEmail(email);
        if (user) {
            const hostPort = Config.site.hostPort ? ":" + Config.site.hostPort : "";
            const from = "geral@accountingame.pt";
            const to = email;
            const subject = "Recuperação de password";
            const hash = Utils.makeid() + new Date().getTime();
            user.resetPasswordToken = hash;
            user.resetPasswordExpires = new Date().getTime() + 3600000;
            const html = '<p>Foi feito um pedido de recuperação da sua password, se não efetou tal pedido porfavor ignore este email. Caso contrário clique <a href="http://' + Config.site.host + hostPort + "/reset/" + hash + '">aqui</a> para fazer o reset á sua password.</p>';
            const text = "Foi feito um pedido de recuperação da sua password, se não efetou tal pedido porfavor ignore este email. Caso contrário clique aqui para fazer o reset á sua password.";
            Email.sendMail(from, to, subject, html, text);
            return this.userDbAdapter.updateUser(user);
        } else {
            throw new Error("UNEXISTING_USER', 404, 'The user doesnt exists");
        }
    }
    public async resetPassword(resetPasswordToken: IUser["resetPasswordToken"], password: IUser["password"]): Promise<IUser> {
        const user = await this.userDbAdapter.getByResetPasswordToken(resetPasswordToken);
        if (user) {
            user.password = await Hash.hash(password);
            return this.userDbAdapter.updateUser(user);
        } else {
            throw new Error("'RESET_TOKEN_NOT_FOUND', 404, 'The provided reset token dont exists");
        }
    }

    private async alreadyExist(email: IUser["email"], username: IUser["username"]): Promise<any> {
        const promiseEmail = this.userDbAdapter.getByEmail(email);
        const promiseUsername = this.userDbAdapter.getByUsername(username);
        const values = await Promise.all([promiseEmail, promiseUsername]);
        return !(values[0] === null && values[1] === null);
    }
}
