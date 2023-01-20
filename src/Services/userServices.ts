import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as userRepository from "../Reposiories/userRepositories.js";
import * as sessionRepository from "../Reposiories/sessionsRepositories.js";

export async function signup(user: userRepository.UserData){
    const {email, password} = user;

    await checkEmail(email);

    const encryptedPassword = encryptPassword(password);

    await userRepository.create({name: user.name, email, type: user.type, password:encryptedPassword, phonenumber: user.phonenumber})
}

async function checkEmail(email: string){
    const user = await userRepository.findByEmail(email);

    if(user){
        throw{
            type: "conflict",
            message: "email already being used"
        };
    }
}

function encryptPassword(password: string){
    const encryptedPassword = bcrypt.hashSync(password, 10);
    return encryptedPassword;
}

export async function signin(userData: userRepository.UserData) {
    const user = await userRepository.findByEmail(userData.email);

    if (!user || !checkPassword(userData.password, user.password)) {
        throw {
            type: "unauthorized",
            message: "Invalid email or password",
        };
    }

    const token = generateToken(user.id);

    await sessionRepository.create({ userId: user.id, token });
    return token;
}

function checkPassword(password: string, passwordHash: string) {
    if (!bcrypt.compareSync(password, passwordHash)) {
        return false;
    }
    return true;
}

function generateToken(userId: number) {
    const data = {
        userId,
    };
    const expirationTime = 60 * 60 * 24 * 7;
    const config = { expiresIn: expirationTime };
    const secretKey = process.env.JWT_SECRET_KEY!;

    const token = jwt.sign(data, secretKey, config);
    return token;
}

export async function getUsers(){
    const users = await userRepository.getUsers();

    return users;
}

export async function editUser(id: number, data: userRepository.UserData){
    await userRepository.edit(id, data);
}

export async function deleteUser(id: number){
    await userRepository.deleteUser(id);
}