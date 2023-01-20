import { User } from "@prisma/client";
import { prisma } from "../Config/db.js";

export type UserData = Omit<User, "id">;

export async function findByEmail(email: string){
    const user = await prisma.user.findFirst({
        where:{email}
    });

    return user;
};

export async function create(user:UserData) {
    await prisma.user.create({
        data: user
    });
};

export async function getUsers(){
    const users = await prisma.user.findMany();

    return users;
}

export async function getById(id:number) {
    const user = await prisma.user.findUnique({
        where: { id },
    });

    return user;
}

export async function edit(id: number,data: UserData){
    await prisma.user.update({
        where: {id},
        data: {name: data.name, email: data.email, type: data.type, phonenumber: data.phonenumber}
    });
}

export async function deleteUser(id: number){
    await prisma.user.delete({
        where: {id}
    });
};