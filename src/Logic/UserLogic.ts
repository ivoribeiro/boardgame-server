"use strict";

import { IUser } from "../Models/User";

export interface IUserLogic {
    register(user: IUser): IUser;
    confirm(confirmationToken: string): IUser;
    recoverPassword(email: string): IUser;
    resetPassword(resetPasswordToken: string, password: string): IUser;
}
export default class UserLogic implements IUserLogic {
    public register(user: IUser): IUser {
        return user;
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