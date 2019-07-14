import { Timestamp } from "bson";
import mongoose, { Document, Schema } from "mongoose";
import { IGame } from "./Game";
import { IQuestion } from "./Question";
import { IUser } from "./User";
enum States { emEspera, emJogo, acabado }

export interface IPlay extends Document {
    answer: number;
    answerTime: number;
    category: number;
    game: IGame;
    player: IUser;
    question: IQuestion;
    score: number;
    wasRight: boolean;

}

const PlaySchema: Schema = new Schema({
    answer: {
        required: false,
        type: Number,
    },
    answerTime: {
        required: true,
        type: Number,
    },
    category: {
        required: true,
        type: Number,
    },
    game: {
        ref: 'Game',
        type: Schema.Types.ObjectId,
    },
    player: {
        ref: 'Player',
        type: Schema.Types.ObjectId,
    },
    question: {
        ref: 'Question',
        type: Schema.Types.ObjectId,
    },
    score: {
        required: true,
        type: Number,
    },
    wasRight: {
        required: false,
        type: Boolean,
    }
});

export default mongoose.model<IPlay>("Play", PlaySchema);
