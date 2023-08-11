import prisma from '@/lib/prismadb';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieList = cookies();
    const cartCookie = cookieList.get('cart');
    if (cartCookie) {
        try {
            // Fetch the count of cart items using Prisma
            const cartItemCount = await prisma.cart.count({
                where: { cookie_id: cartCookie.value },
            });

            // Return the cart item count in the response
            return new Response(JSON.stringify({ count: cartItemCount }), { status: 200 });
        } catch (error) {
            console.error('Error fetching cart item count:', error);
            return new Response(JSON.stringify({ success: false }), { status: 500 });
        } finally {
            // Don't forget to close the Prisma Client connection when you're done
            await prisma.$disconnect();
        }
    } else {
        return new Response(JSON.stringify({ count: 0 }), { status: 200 });
    }
}
