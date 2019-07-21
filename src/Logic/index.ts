import GameDbAdapter, { IGameDbAdapter } from "../Adapters/GameDbAdapter";
import UserDbAdapter, { IUserDbAdapter } from "../Adapters/UserDbAdapter";

import GameModel from "../Models/Game";
import UserModel from "../Models/User";

import GameLogic, { IGameLogic } from "./GameLogic";
import UserLogic, { IUserLogic } from "./UserLogic";

const userDbAdapter: IUserDbAdapter = new UserDbAdapter(UserModel);
export const userLogic: IUserLogic = new UserLogic(userDbAdapter);

const gameDbAdapter: IGameDbAdapter = new GameDbAdapter(GameModel);
export const gameLogic: IGameLogic = new GameLogic(gameDbAdapter);
