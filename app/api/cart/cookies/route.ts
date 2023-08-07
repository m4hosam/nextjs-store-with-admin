import prisma from '@/lib/prismadb';
import { CartSchema } from '@/common.types';
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid';

type Cookie = {
    name: string
    value: string
}


// This route is used to create a cart item in cookies and in db
// First we check if the cookie exists
// If it does, we check if the cookie_id exists in db
// If it does, I just append the product_id and quantity to the db
// If not, we create a new cart item and a new cookie in db*
// If it doesn't, we create a new cookie and a new cart item in db*
export async function GET() {
    const cookieList = cookies();
    const cart = cookieList.get('cart');
    // If the cookie exists, we check if the cookie_id exists in db
    if (cart) {
        console.log('cart exists');
        console.log('cart', cart);
        // if in db, append product_id and quantity to the db
        // if not, create a new cart item and a new cookie in db
        try {
            const cartItem = await prisma.cart.findMany({
                where: { cookie_id: cart.value },
            });

            if (cartItem.length === 0) {
                console.log('cart does not exist in db');
                // next function return a response
                // return hasCookie false
                return new Response(JSON.stringify({ hasCookie: false }), { status: 200 });
            }
            else {
                console.log('cart exists in db');
                // return hasCookie true
                console.log('cartItem', cartItem);
                return new Response(JSON.stringify({ hasCookie: true }), { status: 200 });
                ;
            }
        }
        catch {
            console.log('cart/add database Error');
            return new Response(JSON.stringify({ message: "Cookie Error" }), { status: 500 });
        }
        finally {
            // Don't forget to close the Prisma Client connection when you're done
            await prisma.$disconnect();
        }


    }
    else {
        // Cookie doesn't exist, create a new cookie 

        return new Response(JSON.stringify({ hasCookie: false }), { status: 200 });

    }



}
