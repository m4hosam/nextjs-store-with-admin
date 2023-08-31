import prisma from '@/lib/prismadb';


export async function GET() {

    try {
        const orders = await prisma.orders.findMany({
            select: {
                id: true,
                total: true,
                address: true,
                status: true,
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
