import QuestionDbAdapter from "../Adapters/QuestionDbAdapter";

class Repository<T> {

    private dbAdapter: QuestionDbAdapter;

    constructor(dbAdapter: QuestionDbAdapter) {
        this.dbAdapter = dbAdapter;
    }

    public getAll() {
        return this.dbAdapter.getQuestions();
    }

    public add(question: Question) {
        return this.dbAdapter.createQuestion(question);
    }
}

export default class QuestionRepository extends Repository<Question> {
    constructor(questionDbAdapter: QuestionDbAdapter) {
        super(questionDbAdapter);
    }

}
