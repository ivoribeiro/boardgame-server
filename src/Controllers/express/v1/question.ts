"use strict";
import Router from "express";
import { questionLogic } from "../../../Logic";
import Question, { IQuestion } from "../../../Models/Question";
import QuestionTranslation, { IQuestionTranslation } from "../../../Models/QuestionTranslation";

const router = Router();

router.post("/", async (req, res) => {
    const { category, rightAnswer, translations } = req.body;
    const question: IQuestion = new Question({ category, rightAnswer, translations });
    const newQuestion = await questionLogic.newQuestion(question);
    res.json(newQuestion);
});

router.get("/", async (req, res) => {
    const questions = await questionLogic.all();
    res.json(questions);
});

router.get("/:questionId", async (req, res) => {
    const question = await questionLogic.getQuestion(req.params.questionId);
    res.json(question);
});

router.post("/:questionId/translation/:lang", async (req, res) => {
    const { question, answers } = req.body;
    const translation: IQuestionTranslation = new QuestionTranslation(question, answers);
    const updatedQuestion = await questionLogic.addTranslation(req.params.questionId, translation);
    res.json(updatedQuestion);
});

export default router;
