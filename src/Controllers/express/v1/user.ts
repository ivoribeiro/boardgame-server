"use strict";
import Router from "express";
import { userLogic } from "../../../Logic";
import User, { IUser } from "../../../Models/User";

const router = Router();

router.post("/account/registration", async (req, res) => {
    const { name, email, username, password, gender, birthday } = req.body;
    const user: IUser = new User({ name, email, username, password, gender, birdthday: new Date(birthday) });
    const newUser = await userLogic.register(user);
    res.json(newUser);
});

router.post("/account/confirmation/:token", async (req, res) => {
    const utilizador = await userLogic.confirm(req.params.token);
    res.json({
        message: "User confirmado com sucesso",
        success: true,
        utilizador,
    });
});

router.post("/account/password/recover", async (req, res) => {
    const { resetPasswordToken, resetPasswordExpires } = await userLogic.recoverPassword(req.body.email);
    res.json({
        resetPasswordExpires,
        resetPasswordToken,
        success: true,
    });
});

router.post("/account/password/reset/:token", async (req, res) => {
    await userLogic.resetPassword(req.params.token, req.body.password);
    res.json({
        success: true,
    });
});

router.post("/auth/login", async (req, res) => {
    const { cookie } = await userLogic.login(req.body.email, req.body.password);
    res.setHeader("Set-Cookie", [cookie]);
    res.json({
        success: true,
    });
});

router.post("/auth/check", async (req, res) => {
    await userLogic.checkLogin(req.params.token);
    res.json({
        success: true,
    });
});

router.post("/auth/logout", async (req, res) => {
    res.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
    res.send(200);
});

export default router;
