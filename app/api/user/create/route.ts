import fs from 'fs';
import path from 'path';
import dataUriToBuffer from 'data-uri-to-buffer';
import prisma from '@/lib/prismadb';
import { User } from '@/common.types';



async function readUser(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    return user;
}





export async function POST(request: Request) {
    const { name, email, password, cookie_id }: User = await request.json();

    console.log("-----------create user-----------")
    console.log("name: ", name)
    console.log("email: ", email)
    console.log("password: ", password)
    console.log("cookie_id: ", cookie_id)


    try {
        const user = await readUser(email);
        if (user) {
            return new Response(JSON.stringify({ success: false, message: 'User already exists' }), { status: 200 });
        }

        // Create a new row in the Products table using Prisma
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                cookie_id: cookie_id,
            },
        });

        // Return the user in the response
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return new Response(JSON.stringify({ success: false, error: error }), { status: 500 });
    }

}
