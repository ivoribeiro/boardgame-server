
interface Translation {
    question: string;
    answers: {
        [key: number]: String,
    };
}

interface Question {
    category: number;
    rightAnswer: number;
    translations: {
        [key: string]: Translation,
    };

}

class Translation implements Translation {
    constructor(question: string, answers: { [key: number]: String }) { }
}

class Question implements Question {
    category: number;
    rightAnswer: number;
    translations: {
        [key: string]: Translation,
    };
    constructor(category: number, rightAnswer: number, translations: { [key: string]: Translation }) {
        this.category = category;
        this.rightAnswer = rightAnswer;
        this.translations = translations;
    }
}

export default Question;
