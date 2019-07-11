import mongoose, { Schema } from "mongoose";
import Question from "../Models/Question";

export default class QuestionDbAdapter {

    private MongoModel = mongoose.model("Question", new Schema({
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
                question: {
                    required: true,
                    type: String,
                },
                answers: [{ type: String, required: true }],
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

    public async createQuestion(question: Question) {
        const novo = new this.MongoModel()
        novo.category = question.category
        novo.rightAnswer = question.rightAnswer
        novo.translations = question.translations
        return novo.save();
    }

}
