import { Timestamp } from "bson";
import mongoose, { Document, Schema } from "mongoose";
import { IPlay } from "./Play";
import { IQuestion } from "./Question";
import { IUser } from "./User";
export enum States { waiting, onGame, finished }

export interface IGame extends Document {
    creator: IUser;
    currentPlayer: IUser;
    currentQuestion: IQuestion;
    state: States;
    end: Timestamp;
    plays: IPlay[];
    maxPlayers: number;
    name: string;
    pin: number;
    players: IUser[];
    private: boolean;
    winner: IUser;
    results: {};
    order: IUser[];

}

const GameSchema: Schema = new Schema({
    creator: {
        ref: "User",
        type: Schema.Types.ObjectId,
    },
    currentPlayer: {
        ref: "User",
        type: Schema.Types.ObjectId,
    },
    currentQuestion: {
        ref: "Question",
        type: Schema.Types.ObjectId,
    },
    end: Date,
    maxPlayers: {
        required: true,
        type: Number,
    },
    name: {
        required: true,
        type: String,
    },
    order: [{
        ref: "User",
        type: Schema.Types.ObjectId,
    }],
    pin: Number,
    players: [{
        ref: "User",
        type: Schema.Types.ObjectId,
    }],
    plays: [{
        ref: "Play",
        type: Schema.Types.ObjectId,
    }],
    private: Boolean,
    results: {},
    state: {
        enum: [States.waiting, States.onGame, States.finished],
        type: String,
    },
    winner: {
        ref: "User",
        type: Schema.Types.ObjectId,
    },
});

export default mongoose.model<IGame>("Game", GameSchema);
