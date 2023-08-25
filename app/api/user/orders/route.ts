import fs from 'fs';
import path from 'path';
import dataUriToBuffer from 'data-uri-to-buffer';
import prisma from '@/lib/prismadb';


type Email = {
    email: string;
};


async function readUserId(email: string) {
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
    const { email }: Email = await request.json();




    try {
        const userId = await readUserId(email);
        if (userId === "") {
            return new Response(JSON.stringify({ success: false, message: 'User does not exist' }), { status: 200 });
        }
        const orders = await prisma.orders.findMany({
            select: {
                total: true,
                user: {
                    select: {
                        name: true,
                    },
                },
                address: {
                    select: {
                        address: true,
                        city: true,
                        state: true,
                    },
                },
                OrderItems: {
                    select: {
                        price: true,
                        quantity: true,
                        product: {
                            select: {
                                name: true,
                                brand: true,
                            },
                        },
                    },
                },
                createdAt: true,
            },
        });

        // Return the user in the response
        return new Response(JSON.stringify(orders), { status: 200 });
    } catch (error) {
        console.error('Error user orders route:', error);
        return new Response(JSON.stringify({ success: false, error: error }), { status: 500 });
    }

}
