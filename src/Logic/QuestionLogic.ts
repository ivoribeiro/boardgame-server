"use strict";
import { IQuestionDbAdapter } from "../Adapters/QuestionDbAdapter";
import { default as Config } from "../Config";
import HttpException from "../Exceptions/HttpException";
import { IQuestion } from "../Models/Question";
import { IQuestionTranslation } from "../Models/QuestionTranslation";
import * as Utils from "../Utils";

export interface IQuestionLogic {
    questionDbAdapter: IQuestionDbAdapter;
    newQuestion(question: IQuestion): Promise<IQuestion>;
    all(): Promise<IQuestion[]>;
    getQuestion(questionId: IQuestion["id"]): Promise<IQuestion>;
    addTranslation(questionTranslation: IQuestionTranslation): Promise<IQuestion>;

}
export default class QuestionLogic implements IQuestionLogic {
    public questionDbAdapter: IQuestionDbAdapter;

    constructor(questionDbAdapter: IQuestionDbAdapter) {
        this.questionDbAdapter = questionDbAdapter;
    }
    public async newQuestion(question: IQuestion): Promise<IQuestion> {
        return this.questionDbAdapter.createQuestion(question);
    }
    public async  all(): Promise<IQuestion[]> {
        return this.questionDbAdapter.getQuestions();
    }
    public async getQuestion(questionId: any): Promise<IQuestion> {
        return this.questionDbAdapter.getQuestion(questionId);
    }
    public async addTranslation(questionTranslation: IQuestionTranslation): Promise<IQuestion> {
        throw new Error("Method not implemented.");
    }
}
