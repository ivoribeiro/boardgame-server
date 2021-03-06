import mongoose, { Document, Schema } from "mongoose";

import { IQuestionTranslation } from "./QuestionTranslation";

export interface IQuestion extends Document {
    category: number;
    rightAnswer: number;
    translations: {
        [key: string]: IQuestionTranslation,
    };
}

const QuestionSchema: Schema = new Schema({
    category: {
        required: true,
        type: Number,
    },
    rightAnswer: {
        required: true,
        type: Number,

    },
    translations: {
        of: {
            answers: {
                of: String,
                required: true,
                type: Map,
            },
            question: {
                required: true,
                type: String,
            },
        },
        type: Map,

    },
});

// Export the model and return your IUser interface
export default mongoose.model<IQuestion>("Question", QuestionSchema);
