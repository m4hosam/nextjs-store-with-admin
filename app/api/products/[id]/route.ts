import prisma from '@/lib/prismadb';



export async function GET(request: Request, { params }: { params: { id: string } }) {

    try {
        // Fetch all products from the database using Prisma
        const product = await prisma.products.findUnique({
            where: { id: params.id },
            select: {
                id: true,
                name: true,
                brand: true,
                category: true,
                price: true,
                image: true,
            }
        });

        if (!product) {
            return new Response(JSON.stringify({ message: "Product Not Found" }), { status: 404 });
        }

        // Return the products in the response
        return new Response(JSON.stringify(product), { status: 200 });
    } catch (error) {
        console.error('Error fetching specific product:', error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }

}