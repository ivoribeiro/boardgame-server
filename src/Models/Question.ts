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
    classe: {
        required: true,
        type: Number,
    },
    respostaCerta: {
        required: true,
        type: Number,

    },
    translations: {
        of: {
            answers: [{ type: String, required: true }],
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
