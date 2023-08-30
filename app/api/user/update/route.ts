import fs from 'fs';
import path from 'path';
import dataUriToBuffer from 'data-uri-to-buffer';
import prisma from '@/lib/prismadb';
import { cookies } from 'next/headers'
import { decodeAuthCookie } from '@/app/api/decodeAuth'


async function readUser(email: string) {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    return user;
}

type UserUpdate = {
    name: string;
}





export async function PUT(request: Request) {
    const { name }: UserUpdate = await request.json();
    const cookieList = cookies();
    const cartAuthCookie = cookieList.get('next-auth.session-token')?.value;
    // if no decoded user return 402 unautherized
    const email = await decodeAuthCookie(cartAuthCookie as string)
    // console.log("Not Autherized", email)
    if (!email) {
        // console.log("Not Autherized")
        return new Response(JSON.stringify({ success: false, message: "Not Autherized" }), { status: 402 });
    }
    console.log("-----------update user-----------\n")
    console.log("name: ", name)
    console.log("email: ", email)


    try {
        const user = await readUser(email);
        if (!user) {
            return new Response(JSON.stringify({ success: false, message: 'No user to update' }), { status: 402 });
        }

        // Create a new row in the Products table using Prisma
        await prisma.user.update({
            where: {
                id: user?.id,
            },
            data: {
                name: name,
            },
        });

        // Return the user in the response
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return new Response(JSON.stringify({ success: false, error: error }), { status: 500 });
    }

}
