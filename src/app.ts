import bluebird from "bluebird";
import express = require("express");
import mongoose from "mongoose";
import Question from "./Models/Question";
import QuestionDbAdapter from "./Adapters/QuestionDbAdapter";
import QuestionRepository from "./Repositories/QuestionRepository";
const app: express.Application = express();

// Connect to MongoDB
const mongoUrl = "mongodb://localhost/test";
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, { useNewUrlParser: true }).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  // process.exit();
});

app.get("/", async (req, res) => {
  const questionDbAdapter = new QuestionDbAdapter();
  const questionRepository = new QuestionRepository(questionDbAdapter);
  const question = new Question(1, 1, { "pt": { "question": "Ola", "answers": [] } });
  questionRepository.add(question);
  const questions = await questionRepository.getAll();
  res.json(questions);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
