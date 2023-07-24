import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


export async function GET(request: Request) {

    try {
        // Fetch all products from the database using Prisma
        const allProducts = await prisma.products.findMany();

        // Return the products in the response
        return new Response(JSON.stringify(allProducts), { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }

}
