"use strict";
import { IGameDbAdapter } from "../Adapters/GameDbAdapter";
import { default as Config } from "../Config";
import HttpException from "../Exceptions/HttpException";
import { IGame, States } from "../Models/Game";
import { IQuestion } from "../Models/Question";
import { IUser } from "../Models/User";
import { email as Email, hash as Hash } from "../Services";
import * as Utils from "../Utils";

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
    getGamePlayerResults(gameId: IGame["id"], playerId: IUser["id"]): Promise<IUser>;
    getCurrentQuestion(gameId: IGame["id"]): Promise<IGame["currentQuestion"]>;
    answerCurrentQuestion(gameId: IGame["id"], answer: number, answerTime: number): Promise<IGame["currentQuestion"]>;
    currentQuestionTime(gameId: IGame["id"]): number;
    gameAnswers(gameId: IGame["id"]): Promise<IGame["plays"]>;
    finishGame(gameId: IGame["id"]): Promise<IGame>;
}
export default class GameLogic implements IGameLogic {
    public gameDbAdapter: IGameDbAdapter;

    constructor(gameDbAdapter: IGameDbAdapter) {
        this.gameDbAdapter = gameDbAdapter;
    }
    public async newGame(game: IGame): Promise<IGame> {
        game.state = States.waiting;
        return this.gameDbAdapter.create(game);
    }
    public async all(): Promise<IGame[]> {
        return this.gameDbAdapter.all();
    }
    public async onWaiting(): Promise<IGame[]> {
        return this.gameDbAdapter.getGameByState(States.waiting);
    }
    public async onGame(): Promise<IGame[]> {
        return this.gameDbAdapter.getGameByState(States.onGame);
    }
    public async  finished(): Promise<IGame[]> {
        return this.gameDbAdapter.getGameByState(States.finished);
    }
    public async getGame(gameId: IGame["id"]): Promise<IGame> {
        return this.gameDbAdapter.getGame(gameId);
    }
    public async joinGame(gameId: IGame["id"], playerId: IUser["id"]): Promise<IGame> {
        const game = await this.getGame(gameId);
        game.players.push(playerId);
        return this.gameDbAdapter.updateGame(game);
    }
    public async leaveGame(gameId: IGame["id"], playerId: IUser["id"]): Promise<IGame> {
        const game = await this.getGame(gameId);
        const index = game.players.findIndex((player) => player.id === playerId);
        game.players.splice(index);
        return this.gameDbAdapter.updateGame(game);
    }
    public async gamePlayers(gameId: IGame["id"]): Promise<IGame["players"]> {
        const game = await this.getGame(gameId);
        return game.players;
    }

    // TODO
    public async startGame(gameId: IGame["id"]): Promise<IGame> {
        const game = await this.getGame(gameId);
        game.state = States.onGame;
        const players = game.players;
        // shuffle player order
        game.order = players.sort(() => Math.random() - 0.5);
        game.currentPlayer = game.order[0];
        return this.gameDbAdapter.updateGame(game);
    }

    public async gameResults(gameId: IGame["id"]): Promise<IGame["results"]> {
        const game = await this.getGame(gameId);
        return game.results;
    }
    public async getPlayersOrder(gameId: IGame["id"]): Promise<IGame["order"]> {
        const game = await this.getGame(gameId);
        return game.order;
    }
    public async currentPlayer(gameId: IGame["id"]): Promise<IGame["currentPlayer"]> {
        const game = await this.getGame(gameId);
        return game.currentPlayer;
    }
    public async getGamePlayerResults(gameId: IGame["id"], playerId: IUser["id"]): Promise<object> {
        return (this.gameResults(gameId))[playerId];
    }
    public async getCurrentQuestion(gameId: IGame["id"]): Promise<IGame["currentQuestion"]> {
        const game = await this.getGame(gameId);
        return game.currentQuestion;
    }
    public async answerCurrentQuestion(gameId: IGame["id"], answer: number, answerTime: number): Promise<IQuestion> {
        throw new Error("Method not implemented.");
    }
    public async currentQuestionTime(gameId: IGame["id"]): number {
        throw new Error("Method not implemented.");
    }
    public async gameAnswers(gameId: IGame["id"]): Promise<IGame["plays"]> {
        const game = await this.getGame(gameId);
        return game.plays;
    }
    public async finishGame(gameId: IGame["id"]): Promise<IGame> {
        const game = await this.getGame(gameId);
        game.state = States.finished;
        return this.gameDbAdapter.updateGame(game);
    }

}
