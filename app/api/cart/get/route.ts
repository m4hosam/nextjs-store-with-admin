import prisma from '@/lib/prismadb';
import { cookies } from 'next/headers'


export async function GET() {
    const cookieList = cookies();
    const cartCookie = cookieList.get('cart');
    if (cartCookie) {
        try {
            // Fetch all products in the cart using Prisma
            const cartItems = await prisma.cart.findMany({
                where: { cookie_id: cartCookie.value },
                select: {
                    product_id: true,
                    quantity: true,
                },
            });

            // if (!cartItems) {
            //     return new Response(JSON.stringify({ message: "cart Not Found in DB", success: false }), { status: 404 });
            // }

            // Return the cart items in the response
            return new Response(JSON.stringify(cartItems), { status: 200 });
        } catch (error) {
            console.error('Error fetching specific product:', error);
            return new Response(JSON.stringify({ success: false }), { status: 500 });
        } finally {
            // Don't forget to close the Prisma Client connection when you're done
            await prisma.$disconnect();
        }
    }
    else {
        return new Response(JSON.stringify([]), { status: 200 });
    }


}