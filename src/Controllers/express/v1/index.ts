"use strict";
import Router from "express";
import gameRouter from "./game";
import questionRouter from "./question";
import userRouter from "./user";
const router = Router();

router.use("/user", userRouter);
router.use("/game", gameRouter);
router.use("/question", questionRouter);
export default router;
