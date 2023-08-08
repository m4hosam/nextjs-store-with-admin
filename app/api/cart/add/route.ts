import prisma from '@/lib/prismadb';
import { CartSchema } from '@/common.types';
import { cookies } from 'next/headers'
import { type } from 'os';
import { nanoid } from 'nanoid';

type Cookie = {
    name: string
    value: string
}


function createCookie() {
    let myuuid = nanoid();
    const cookie: Cookie = {
        name: 'cart',
        value: myuuid
    }
    return cookie;
}


async function hasCookie() {
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
                return false;
            }
            else {
                console.log('cart exists in db');
                // return hasCookie true
                // console.log('cartItem', cartItem);
                //  return the cookie id foud in the db
                return true;

            }
        }
        catch (error) {
            console.log('cart/add database Error');
            return error;
        }
    }
    else {
        // Cookie doesn't exist, create a new cookie 
        const newCookie = createCookie();
        cookieList.set(newCookie)
        // return hasCookie false (new cookie id)
        return false;

    }
}

async function addNewCookie(cookie_id: any, product_id: string, quantity: number) {
    // add the cart id to db
    try {
        // Create a new row in the Products table using Prisma
        const newCart = await prisma.cart.create({
            data: {
                cookie_id: cookie_id,
                product_id: product_id,
                quantity: Number(quantity),
            },
        });

        // Return the products in the response
        console.log("new cart had been created");
        return 1;
    } catch (error) {
        console.error('Error fetching products:', error);
        return error;
    }
}


// This route is used to create a cart item in cookies and in db
// First we check if the cookie exists
// If it does, we check if the cookie_id exists in db
// If it does, I just append the product_id and quantity to the db
// If not, we create a new cart item and a new cookie in db*
// If it doesn't, we create a new cookie and a new cart item in db*
export async function POST(request: Request) {
    const { product_id, quantity }: CartSchema = await request.json();
    const cookieList = cookies();
    const cartCookie = cookieList.get('cart');
    console.log('product_id', product_id);
    console.log('quantity', quantity);

    // Check if the cookie exists
    const isThereACookie = await hasCookie();

    if (isThereACookie) {
        try {

            // If the cookie exists, we add the product_id and quantity to the db
            const updatedCart = await prisma.cart.updateMany({
                where: { cookie_id: cartCookie?.value, product_id: product_id },
                data: {
                    quantity: Number(quantity),
                },
            });
            if (updatedCart.count === 0) {
                await addNewCookie(cartCookie?.value, product_id, quantity);
            }

            console.log('updated/add record');
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        }
        catch (error) {
            console.log('isThereACookie database Error');
            return new Response(JSON.stringify({ success: false }), { status: 500 });
        }


    }
    else {
        // If the cookie doesn't exist, we create a new cookie and a new cart item in db
        const newCookie = createCookie();
        cookieList.set(newCookie)
        try {
            await addNewCookie(newCookie.value, product_id, quantity);
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        }
        catch (error) {
            console.log('addNewCookie database Error');
            return new Response(JSON.stringify({ success: false }), { status: 500 });
        }

    }


}
