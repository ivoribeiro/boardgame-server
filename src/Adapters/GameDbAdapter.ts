import mongoose from "mongoose";
import { IGame, States } from "../Models/Game";
import { IUser } from "../Models/User";

export interface IGameDbAdapter {
    mongooseModel: mongoose.Model<IGame>;
    create(user: IGame): Promise<IGame>;
    all(): Promise<IGame[]>;
    getGameByState(state: IGame["state"]): Promise<IGame[]>;
    getGame(id: IGame["id"]): Promise<IGame>;
    updateGame(game: IGame): Promise<IGame>;
}

export default class GameDbAdapter implements IGameDbAdapter {

    public mongooseModel: mongoose.Model<IGame>;

    constructor(mongooseModel: mongoose.Model<IGame>) {
        this.mongooseModel = mongooseModel;
    }
    public create(user: IGame): Promise<IGame> {
        const newUser = new this.mongooseModel(user);
        return newUser.save();
    }

    public async all(): Promise<IGame[]> {
        return this.mongooseModel.find({});
    }

    public async getGameByState(state: IGame["state"]): Promise<IGame[]> {
        return this.mongooseModel.find({ state })
            .populate("creator")
            .populate("players");
    }

    public async getGame(gameId: IGame["id"]): Promise<IGame> {
        return this.mongooseModel.findOne({ _id: String(gameId) })
            .populate("creator")
            .populate("players")
            .populate("play")
            .populate("order")
            .populate("currentPlayer");
    }

    public async updateGame(game: IGame): Promise<IGame> {
        const update = new this.mongooseModel(game);
        return update.save();
    }

    public async winGame(gameId: IGame["id"], playerId: IUser["id"]) {
        const game = await this.getGame(gameId);
        game.winner = playerId;
        return game.save();
    }

    public async finishGame(gameId: IGame["id"]) {
        const game = await this.getGame(gameId);
        game.state = States.finished;
        game.end = new Date();
        return game.save();
    }

    public async addMove(gameId: IGame["id"], _idMove) {
        const game = await this.getGame(gameId);
        game.jogadas.push(_idMove);
        return game.save();
    }

    public async getPontuacoesGame(gameId: IGame["id"]) {
        const game = await getGame(gameId);
        const pontuacoes = {};
        for (let i = 0; i < game.jogadas.length; i++) {
            if (!pontuacoes[game.jogadas[i].jogador]) {
                pontuacoes[game.jogadas[i].jogador] = 0;
            }
            pontuacoes[game.jogadas[i].jogador] += game.jogadas[i].pontuacao;
        }
        return pontuacoes;
    }

}
