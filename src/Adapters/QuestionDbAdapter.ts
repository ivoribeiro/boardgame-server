import mongoose, { Schema } from "mongoose";
import { IQuestion } from "../Models/Question";

export interface IQuestionDbAdapter {
    mongooseModel: mongoose.Model<IQuestion>;
    getQuestions(): Promise<IQuestion[]>;
    createQuestion(question: IQuestion): Promise<IQuestion>;
}

export default class QuestionDbAdapter implements IQuestionDbAdapter {
    public mongooseModel: mongoose.Model<IQuestion>;

    constructor(mongooseModel: mongoose.Model<IQuestion>) {
        this.mongooseModel = mongooseModel;
    }

    public async getQuestions(): Promise<IQuestion[]> {
        return this.mongooseModel.find({}, { password: 0 });
    }

    public async createQuestion(question: IQuestion): Promise<IQuestion> {
        const newQuestion = new this.mongooseModel();
        newQuestion.category = question.category;
        newQuestion.rightAnswer = question.rightAnswer;
        newQuestion.translations = question.translations;
        return newQuestion.save();
    }

}
