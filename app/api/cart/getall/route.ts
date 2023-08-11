import prisma from '@/lib/prismadb';
import { cookies } from 'next/headers'
import { NextResponse, NextRequest } from 'next/server'


// export async function GET(request: NextRequest, response: NextResponse) {
export async function GET() {
    // Why i can't read the cookies here?
    const cookieList = cookies();
    console.log("cookieList", cookieList)

    // const cartCookie = response.cookies.get('cart');
    const cartCookie = cookieList.get('cart');
    console.log("cartCookie getAll sup /", cartCookie)
    if (cartCookie) {
        try {

            // Fetch cart items with associated product and quantity
            const cartItemsWithProducts = await prisma.$queryRaw`SELECT
                c.product_id,
                p.name,
                p.brand,
                p.category,
                p.price,
                p.image,
                c.quantity
            FROM
                Cart c
            JOIN
                Products p ON c.product_id = p.id
            WHERE
                c.cookie_id = ${cartCookie.value};`


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