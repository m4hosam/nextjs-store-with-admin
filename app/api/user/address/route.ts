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




    try {

        // Return the user in the response
        return new Response(JSON.stringify({ success: "Post" }), { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return new Response(JSON.stringify({ success: false, error: error }), { status: 500 });
    }

}


export async function GET(request: Request) {

    return new Response(JSON.stringify({ success: "Get" }), { status: 200 });


}
