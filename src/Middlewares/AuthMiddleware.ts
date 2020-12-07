import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import HttpException from "../Exceptions/HttpException";
import { IDataStoredInToken } from "../Interfaces/Token";

async function authMiddleware(request: Request, response: Response, next: NextFunction) {
    const cookies = request.cookies;
    if (cookies && cookies.Authorization) {
        const secret = process.env.JWT_SECRET;
        const verificationResponse = jwt.verify(cookies.Authorization, secret) as IDataStoredInToken;
        next();
    } else {
        next(new HttpException(403, "NO_AUTH_TOKEN, no auth token supplied"));
    }
}

export default authMiddleware;
