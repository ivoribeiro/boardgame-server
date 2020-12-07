import { IGameDbAdapter } from "../Adapters/GameDbAdapter";
import { IGame } from "../Models/Game";
import { IUser } from "../Models/User";

export interface IGameLogic {
    gameDbAdapter: IGameDbAdapter;
    newGame(game: IGame): Promise<IGame>;
    all(): Promise<IGame[]>;
    onWaiting(): Promise<IGame[]>;
    onGame(): Promise<IGame[]>;
    finished(): Promise<IGame[]>;
    getGame(gameId: IGame["id"]): Promise<IGame>;
    joinGame(gameId: IGame["id"], playerId: IUser["id"]): Promise<IGame>;
    leaveGame(gameId: IGame["id"], playerId: IUser["id"]): Promise<IGame>;
    gamePlayers(gameId: IGame["id"]): Promise<IGame["players"]>;
    startGame(gameId: IGame["id"]): Promise<IGame>;
    gameResults(gameId: IGame["id"]): Promise<IGame["results"]>;
    getPlayersOrder(gameId: IGame["id"]): Promise<IGame["order"]>;
    currentPlayer(gameId: IGame["id"]): Promise<IGame["currentPlayer"]>;
    getGamePlayerResults(gameId: IGame["id"], playerId: IUser["id"]): Promise<IGame["results"]>;
    getCurrentQuestion(gameId: IGame["id"]): Promise<IGame["currentQuestion"]>;
    answerCurrentQuestion(gameId: IGame["id"], answer: number, answerTime: number): Promise<IGame["currentQuestion"]>;
    currentQuestionTime(gameId: IGame["id"]): Promise<number>;
    gameAnswers(gameId: IGame["id"]): Promise<IGame["plays"]>;
    finishGame(gameId: IGame["id"]): Promise<IGame>;
}
