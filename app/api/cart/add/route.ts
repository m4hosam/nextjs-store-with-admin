import fs from 'fs';
import path from 'path';
import dataUriToBuffer from 'data-uri-to-buffer';
import { PrismaClient } from '@prisma/client'
// import { CartSchema } from '@/common.types';
import { cookies } from 'next/headers'

interface CartSchema {
    product_id: string;
    quantity: number;
}

type Cookie = {
    name: string
    value: string
}

// const prisma = new PrismaClient();


export async function POST(request: Request) {
    const cookiesList = cookies()
    cookiesList.set('cart', '5345fsdfe5')
    try {
        const { product_id, quantity }: CartSchema = await request.json();
        console.log('product_id', product_id);
        console.log('quantity', quantity);
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }


    // try {
    //     // Create a new row in the Products table using Prisma
    //     const newCart = await prisma.cart.create({
    //         data: {
    //             cookie_id: '123',
    //             product_id: product_id,
    //             quantity: quantity,
    //         },
    //     });

    //     // Return the products in the response
    //     return new Response(JSON.stringify({ success: true }), { status: 200 });
    // } catch (error) {
    //     console.error('Error fetching products:', error);
    //     return new Response(JSON.stringify({ success: false }), { status: 500 });
    // } finally {
    //     // Don't forget to close the Prisma Client connection when you're done
    //     await prisma.$disconnect();
    // }

}
