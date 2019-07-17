import mongoose, { Schema } from "mongoose";
import { IQuestion } from "../Models/Question";

export default class QuestionDbAdapter {

    private MongoModel = mongoose.model<IQuestion>("Question", new Schema({
        category: {
            required: true,
            type: Number,
        },
        rightAnswer: {
            required: true,
            type: Number,
        },
        translations: {
            answers: [{ type: String, required: true }],
            of: {
                question: {
                    required: true,
                    type: String,
                },
            },
            type: Map,
        },
    },
        {
            timestamps: true,
            usePushEach: true,
        },
    ));

    public async getQuestions() {
        return this.MongoModel.find({}, { password: 0 });
    }

    public async createQuestion(question: IQuestion) {
        const novo = new this.MongoModel();
        novo.category = question.category;
        novo.rightAnswer = question.rightAnswer;
        novo.translations = question.translations;
        return novo.save();
    }

}
