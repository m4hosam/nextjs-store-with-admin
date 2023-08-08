import prisma from '@/lib/prismadb';
import { CartSchema } from '@/common.types';
import { cookies } from 'next/headers'
import { nanoid } from 'nanoid'

type Cookie = {
    name: string
    value: string
}

function createCookie() {
    let myNanoId = nanoid();
    const cookie: Cookie = {
        name: 'cart',
        value: myNanoId
    }
    return cookie;
}


// This route is used to check if the cookie exists or not in the db or browser

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
                const newCookie = createCookie();
                cookieList.set(newCookie)
                // return hasCookie false (new cookie id)
                return new Response(JSON.stringify({ cookie_id: newCookie.value }), { status: 200 });
            }
            else {
                console.log('cart exists in db');
                // return hasCookie true
                console.log('cartItem', cartItem);
                //  return the cookie id foud in the db
                return new Response(JSON.stringify({ cookie_id: cart.value }), { status: 200 });
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
        const newCookie = createCookie();
        cookieList.set(newCookie)
        // return hasCookie false (new cookie id)
        return new Response(JSON.stringify({ cookie_id: newCookie.value }), { status: 200 });

    }
}
