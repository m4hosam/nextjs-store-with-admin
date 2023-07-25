import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()



export async function GET(request: Request, { params }: { params: { id: string } }) {

    try {
        // Fetch all products from the database using Prisma
        const product = await prisma.products.findUnique({
            where: { id: params.id },
        });

        if (!product) {
            return new Response(JSON.stringify({ message: "Product Not Found" }), { status: 404 });
        }

        // Return the products in the response
        return new Response(JSON.stringify(product), { status: 200 });
    } catch (error) {
        console.error('Error fetching specific product:', error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    } finally {
        // Don't forget to close the Prisma Client connection when you're done
        await prisma.$disconnect();
    }

}