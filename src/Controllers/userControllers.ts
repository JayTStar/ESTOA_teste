import { Request, Response } from "express";

import * as userService from "../Services/userServices.js";
import { UserData } from "../Reposiories/userRepositories.js";

export async function signup(req: Request, res: Response){
    const user : UserData = req.body;

    await userService.signup(user);

    res.sendStatus(201);
}

export async function signin(req: Request, res: Response){
    const user = req.body;

    const token: string = await userService.signin(user);

    res.send(token);
}

export async function getUsers(req: Request, res:Response){
    const users = await userService.getUsers();

    res.send(users)
}

export async function editUser(req: Request, res: Response){
    const {id} = req.params

    const data = req.body;

    await userService.editUser(parseInt(id), data);

    res.sendStatus(200);
}

export async function deleteUser(req: Request, res: Response){
    const {id} = req.params;

    await userService.deleteUser(parseInt(id));

    res.sendStatus(200);
}