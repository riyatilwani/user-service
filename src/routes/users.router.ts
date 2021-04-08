import { HttpStatusCode } from './../enums/http-status-code';
import { User } from './../models/user.interface';
import express, { Request, Response } from "express";
import { login, uploadUsers } from "../services/user.service";
import { BaseResponse } from '../models/pojos/baseresponse';
import { ErrorResponse } from '../models/pojos/errorresponse';

export const usersRouter = express.Router();

usersRouter.post("/upload", async (req: Request, res: Response) => {
    try {
        const users: User[] = await uploadUsers(req.body);
        res.status(HttpStatusCode.CREATED).send(new BaseResponse(HttpStatusCode.CREATED, users));
    } catch (e) {
        res.status(e.httpCode).send(new ErrorResponse(e.httpCode, e.message));
    }
});

usersRouter.post("/login", async (req: Request, res: Response) => {
    try {
        const user: User = await login(req.body);
        res.status(HttpStatusCode.OK).send(new BaseResponse(HttpStatusCode.OK, user));
    } catch (e) {
        res.status(e.httpCode).send(new ErrorResponse(e.httpCode, e.message));
    }
});