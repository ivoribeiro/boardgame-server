"use strict";
import Router from "express";
import { gameLogic } from "../../../Logic";
import Game, { IGame } from "../../../Models/Game";

const router = Router();

router.post("/", async (req, res) => {
    const game: IGame = new Game(
        {
            creator: req.body.creator,
            maxPlayers: req.body.maxPlayers,
            name: req.body.name,
            pin: req.body.pin,
            private: req.body.private,
        },
    );
    const newGame = await gameLogic.newGame(game);
    res.json(newGame);
});

router.get("/", async (req, res) => {
    const games = await gameLogic.all();
    res.json(games);
});

router.get("/waiting", async (req, res) => {
    const waiting = await gameLogic.onWaiting();
    res.json(waiting);
});

router.get("/playing", async (req, res) => {
    const playing = await gameLogic.onGame();
    res.json(playing);
});

router.get("/finished", async (req, res) => {
    const finished = await gameLogic.finished();
    res.json(finished);
});

router.get("/:id", async (req, res) => {
    const game = await gameLogic.getGame(req.params.id);
    res.json(game);
});

router.post("/:id/players/join/:playerId", async (req, res) => {
    const game = await gameLogic.joinGame(req.params.id, req.params.playerId);
    res.json(game);
});

router.post("/:id/players/leave/:playerId", async (req, res) => {
    const game = await gameLogic.leaveGame(req.params.id, req.params.playerId);
    res.json(game);
});

router.get("/:id/players", async (req, res) => {
    const players = await gameLogic.gamePlayers(req.params.id);
    res.json(players);
});

router.post("/:id/start", async (req, res) => {
    const game = await gameLogic.startGame(req.params.id);
    res.json(game);
});

router.get("/:id/results", async (req, res) => {
    const results = await gameLogic.gameResults(req.params.id);
    res.json(results);
});

router.get("/:id/players/order", async (req, res) => {
    const question = await gameLogic.getPlayersOrder(req.params.id);
    res.json(question);
});

router.get("/:id/players/current", async (req, res) => {
    const player = await gameLogic.currentPlayer(req.params.id);
    res.json(player);
});

router.get("/:id/players/:playerId/results", async (req, res) => {
    const results = await gameLogic.getGamePlayerResults(req.params.id, req.params.playerId);
    res.json(results);
});

router.get("/:id/current/question", async (req, res) => {
    const question = await gameLogic.getCurrentQuestion(req.params.id);
    res.json(question);
});

router.post("/:id/current/question/answer", async (req, res) => {
    const question = await gameLogic.answerCurrentQuestion(req.params.id, req.body.resposta, req.body.tempoResposta);
    res.json(question);
});

router.get("/:id/current/question/time", async (req, res) => {
    const time = await gameLogic.currentQuestionTime(req.params.id);
    res.json(time);
});

router.get("/:id/answers", async (req, res) => {
    const answers = await gameLogic.gameAnswers(req.params.id);
    res.json(answers);
});

router.post("/:id/finish", async (req, res) => {
    const results = await gameLogic.finishGame(req.params.id);
    res.json(results);
});

export default router;
