export interface IQuestionTranslation {
    question: string;
    answers: {
        [key: number]: string,
    };
}

export default class QuestionTranslation implements IQuestionTranslation {
    public question: string;
    public answers: { [key: number]: string; };
    constructor(question: string, answers: { [key: number]: string }) { }
}
