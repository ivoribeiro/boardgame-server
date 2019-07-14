"use strict";
import Router from "express";
import UserLogic, { IUserLogic } from "../../../Logic/UserLogic";
import User, { IUser } from "../../../Models/User";
const router = Router();
const userLogic: IUserLogic = new UserLogic();
router.post("/account/registration", async (req, res) => {
    const { name, email, username, password, gender, birthday } = req.body;
    const user: IUser = new User(name, email, username, password, gender, birthday);
    const newUser = await userLogic.register(user);
    res.json(newUser);
});

router.post("/confirmation/:token", async (req, res) => {
    const utilizador = await userLogic.confirm(req.params.token);
    res.json({
        message: "User confirmado com sucesso",
        success: true,
        utilizador,
    });
});

router.post("/password/recover", async (req, res) => {
    const { resetPasswordToken, resetPasswordExpires } = await userLogic.recoverPassword(req.body.email);
    res.json({
        success: true,
        resetPasswordToken,
        resetPasswordExpires,
    });
});

router.post("/password/reset/:token", async (req, res) => {
    await userLogic.resetPassword(req.params.token, req.body.password);
    res.json({
        success: true,
    });
});

export default router;
