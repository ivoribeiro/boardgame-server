import QuestionDbAdapter from "../Adapters/QuestionDbAdapter";
import { IQuestion } from "../Models/Question";

class Repository<T> {

    private dbAdapter: QuestionDbAdapter;

    constructor(dbAdapter: QuestionDbAdapter) {
        this.dbAdapter = dbAdapter;
    }

    public getAll() {
        return this.dbAdapter.getQuestions();
    }

    public add(question: IQuestion) {
        return this.dbAdapter.createQuestion(question);
    }
}

export default class QuestionRepository extends Repository<IQuestion> {
    constructor(questionDbAdapter: QuestionDbAdapter) {
        super(questionDbAdapter);
    }

}
