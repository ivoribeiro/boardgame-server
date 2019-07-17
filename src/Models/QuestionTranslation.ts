export interface IQuestionTranslation {
    question: string;
    answers: {
        [key: number]: String,
    };
}

export default class QuestionTranslation implements IQuestionTranslation {
    public question: string;
    public answers: { [key: number]: String; };
    constructor(question: string, answers: { [key: number]: String }) { }
}
