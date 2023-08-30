import prisma from '@/lib/prismadb';
import { cookies } from 'next/headers'
import { decode } from 'next-auth/jwt';
import { decodeAuthCookie } from '@/app/api/decodeAuth'

type Email = {
    email: string;
}

async function readUserId(email: any) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                id: true,
            },
        });
        return user?.id || '';;
    } catch (error) {
        return "";
    }
}



export async function POST(request: Request) {
    console.log("-------- Get /address/read ---------")
    const cookieList = cookies();
    const cartAuthCookie = cookieList.get('next-auth.session-token')?.value;
    // if no decoded user return 402 unautherized
    let email = await decodeAuthCookie(cartAuthCookie as string)
    // console.log("Not Autherized", email)
    if (!email) {
        // console.log("Not Autherized")
        return new Response(JSON.stringify({ message: "Not Autherized" }), { status: 402 });
    }

    // console.log("request: ", request)
    // const { email }: Email = await request.json();
    try {
        // console.log("email: ", email)
        const user_id = await readUserId(email);
        if (!user_id) {
            return new Response(JSON.stringify(false), { status: 404 });
        }
        const address = await prisma.addresses.findFirst({
            where: {
                user_id: user_id,
            },
            select: {
                address: true,
                city: true,
                state: true,
                postal: true,
                phone: true,
            },

        });

        if (!address) {
            return new Response(JSON.stringify({
                address: "",
                city: "",
                state: "",
                postal: "",
                phone: "",
            }), { status: 200 });
        }
        return new Response(JSON.stringify(address), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(false), { status: 500 });
    }


}