import mongoose from "mongoose";
import { IUser } from "../Models/User";

export interface IUserDbAdapter {
    mongooseModel: mongoose.Model<IUser>;
    create(user: IUser): Promise<IUser>;
    getByEmail(email: IUser["email"]): Promise<IUser>;
    getByUsername(username: IUser["username"]): Promise<IUser>;
    getByConfirmationToken(confirmationToken: IUser["confirmationToken"]): Promise<IUser>;
    getByResetPasswordToken(resetPasswordToken: IUser["resetPasswordToken"]): Promise<IUser>;
    updateUser(user: IUser): Promise<IUser>;
}

export default class UserDbAdapter implements IUserDbAdapter {

    public mongooseModel: mongoose.Model<IUser>;

    constructor(mongooseModel: mongoose.Model<IUser>) {
        this.mongooseModel = mongooseModel;
    }
    public create(user: IUser): Promise<IUser> {
        const newUser = new this.mongooseModel(user);
        return newUser.save();
    }
    public async getByEmail(email: IUser["email"]): Promise<IUser> {
        return this.mongooseModel.findOne({ email });
    }
    public async getByUsername(username: IUser["username"]): Promise<IUser> {
        return this.mongooseModel.findOne({ username });
    }

    public async getByConfirmationToken(confirmationToken: IUser["confirmationToken"]): Promise<IUser> {
        return this.mongooseModel.findOne({ confirmationToken });
    }

    public async getByResetPasswordToken(resetPasswordToken: IUser["resetPasswordToken"]): Promise<IUser> {
        return this.mongooseModel.findOne({ resetPasswordToken });
    }
    public async updateUser(user: IUser): Promise<IUser> {
        user = new this.mongooseModel(user);
        return user.save();
    }

}
