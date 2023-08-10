import prisma from '@/lib/prismadb';
import { cookies } from 'next/headers'


export async function GET() {
    // Why i can't read the cookies here?
    const cookieList = cookies();
    const cartCookie = cookieList?.get('cart');
    console.log("cartCookie", cartCookie)
    if (cartCookie) {
        try {
            // Fetch cart items with associated product and quantity
            const cartItemsWithProducts = await prisma.cart.findMany({
                where: { cookie_id: cartCookie.value },
                select: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            brand: true,
                            category: true,
                            price: true,
                            image: true,
                        },
                    },
                    quantity: true,
                },
            });

            // if (!cartItems) {
            //     return new Response(JSON.stringify({ message: "cart Not Found in DB", success: false }), { status: 404 });
            // }
            // console.log("cartItemsWithProducts", cartItemsWithProducts)
            // Return the cart items in the response
            return new Response(JSON.stringify(cartItemsWithProducts), { status: 200 });
        } catch (error) {
            console.error('Error fetching specific product:', error);
            return new Response(JSON.stringify({ success: false }), { status: 500 });
        }
    }
    else {
        return new Response(JSON.stringify([]), { status: 200 });
    }
}