export interface IQuestionTranslation {
    question: string;
    answers: {
        [key: number]: String,
    };
}

export default class QuestionTranslation implements IQuestionTranslation {
    question: string;
    answers: { [key: number]: String; };
    constructor(question: string, answers: { [key: number]: String }) { }
}