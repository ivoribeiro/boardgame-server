import UserDbAdapter, { IUserDbAdapter } from "../Adapters/UserDbAdapter";
import UserModel from "../Models/User";
import UserLogic, { IUserLogic } from "./UserLogic";

const userDbAdapter: IUserDbAdapter = new UserDbAdapter(UserModel);
export const userLogic: IUserLogic = new UserLogic(userDbAdapter);
