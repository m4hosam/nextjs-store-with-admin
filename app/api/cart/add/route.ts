import prisma from '@/lib/prismadb';
import { CartSchema } from '@/common.types';
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid';

type Cookie = {
    name: string
    value: string
}


function createCookie() {
    let myuuid = uuidv4();
    const cookie: Cookie = {
        name: 'cart',
        value: myuuid
    }
    return cookie;
}






// This route is used to create a cart item in cookies and in db
// First we check if the cookie exists
// If it does, we check if the cookie_id exists in db
// If it does, I just append the product_id and quantity to the db
// If not, we create a new cart item and a new cookie in db*
// If it doesn't, we create a new cookie and a new cart item in db*
export async function POST(request: Request) {
    const cookieList = cookies();
    const { product_id, quantity }: CartSchema = await request.json();
    console.log('product_id', product_id);
    console.log('quantity', quantity);

    async function addNewCookie() {
        const newCookie = createCookie();
        cookieList.set(newCookie)
        // add the cart id to db
        try {
            // Create a new row in the Products table using Prisma
            const newCart = await prisma.cart.create({
                data: {
                    cookie_id: newCookie.value,
                    product_id: product_id,
                    quantity: Number(quantity),
                },
            });

            // Return the products in the response
            return new Response(JSON.stringify({ success: true }), { status: 200 });
        } catch (error) {
            console.error('Error fetching products:', error);
            return new Response(JSON.stringify({ success: false }), { status: 500 });
        } finally {
            // Don't forget to close the Prisma Client connection when you're done
            await prisma.$disconnect();
        }
    }





    try {

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

                if (!cartItem) {
                    console.log('cart does not exist in db');
                    // next function return a response
                    addNewCookie();
                }
                else {
                    console.log('cart exists in db');
                    // If quantity is zero, delete the cart item from db

                    // Update the cart items in the database using Prisma
                    console.log('cartItem: ', cartItem);
                    for (let i = 0; i < cartItem.length; i++) {
                        if (cartItem[i].product_id === product_id) {
                            console.log('product_id exists in db');
                            const updatedCart = await prisma.cart.update({
                                where: { id: cartItem[i].id },
                                data: {
                                    quantity: Number(quantity),
                                },
                            });
                            return new Response(JSON.stringify({ message: "data has been updated" }), { status: 200 });
                        }
                    }
                    console.log('product_id does not exist in db');
                    const newCart = await prisma.cart.create({
                        data: {
                            cookie_id: cart.value,
                            product_id: product_id,
                            quantity: Number(quantity),
                        },
                    });

                    return new Response(JSON.stringify({ message: "new product has been added to cart" }), { status: 200 });
                }
            }
            catch {
                console.log('cart/add database Error');
                return new Response(JSON.stringify({ message: "cart/add database Error" }), { status: 500 });
            }
            finally {
                // Don't forget to close the Prisma Client connection when you're done
                await prisma.$disconnect();
            }


        }
        else {
            console.log('cart does not exist');
            addNewCookie();
            return new Response(JSON.stringify({ message: "WTF" }), { status: 200 });

        }

    }
    catch {

        return new Response(JSON.stringify({ message: "Proplem in cookies api" }), { status: 500 });

    }

}
