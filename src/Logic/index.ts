import GameDbAdapter, { IGameDbAdapter } from "../Adapters/GameDbAdapter";
import QuestionDbAdapter, { IQuestionDbAdapter } from "../Adapters/QuestionDbAdapter";
import UserDbAdapter, { IUserDbAdapter } from "../Adapters/UserDbAdapter";

import { IGameLogic } from "../Interfaces/Game";
import GameModel from "../Models/Game";
import QuestionModel from "../Models/Question";
import UserModel from "../Models/User";
import GameLogic from "./GameLogic";
import QuestionLogic, { IQuestionLogic } from "./QuestionLogic";
import UserLogic, { IUserLogic } from "./UserLogic";

const userDbAdapter: IUserDbAdapter = new UserDbAdapter(UserModel);
export const userLogic: IUserLogic = new UserLogic(userDbAdapter);

const gameDbAdapter: IGameDbAdapter = new GameDbAdapter(GameModel);
export const gameLogic: IGameLogic = new GameLogic(gameDbAdapter);

const questionDbAdapter: IQuestionDbAdapter = new QuestionDbAdapter(QuestionModel);
export const questionLogic: IQuestionLogic = new QuestionLogic(questionDbAdapter);
