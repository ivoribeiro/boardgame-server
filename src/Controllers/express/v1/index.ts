"use strict";
import Router from "express";
import gameRouter from "./game";
import userRouter from "./user";
const router = Router();

router.use("/user", userRouter);
router.use("/game", gameRouter);
export default router;
