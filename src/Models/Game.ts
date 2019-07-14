import { Timestamp } from "bson";
import mongoose, { Document, Schema } from "mongoose";
import { IPlay } from "./Play";
import { IUser } from "./User";
enum States { emEspera, emJogo, acabado }

export interface IGame extends Document {
    creator: number;
    state: States;
    end: Timestamp;
    plays: IPlay[];
    maxPlayers: number;
    name: string;
    pin: number;
    players: IUser[];
    private: boolean;
    winner: IUser;

}

const GameSchema: Schema = new Schema({
    criador: {
        ref: "User",
        type: Schema.Types.ObjectId,
    },
    estado: {
        enum: ["emEspera", "emJogo", "acabado"],
        type: String,
    },
    fimGame: Date,
    jogadas: [{
        ref: "Move",
        type: Schema.Types.ObjectId,
    }],
    maxPlayers: {
        required: true,
        type: Number,
    },
    name: {
        required: true,
        type: String,
    },
    pin: Number,
    players: [{
        ref: "User",
        type: Schema.Types.ObjectId,
    }],
    privado: Boolean,
    vencedor: {
        ref: "User",
        type: Schema.Types.ObjectId,
    },
});

export default mongoose.model<IGame>("Game", GameSchema);
