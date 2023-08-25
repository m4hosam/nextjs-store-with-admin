import prisma from '@/lib/prismadb';
import { CheckoutSchema, OrderItem } from '@/common.types';


// {
//     "name": "Mohamed",
//     "email": "smilemohamed5@gmail.com",
//     "address": "Subk elahad ashmoun",
//     "city": "Menofia",
//     "state": "ashmoun",
//     "postal": "55555",
//     "phone": "111111111",
//     "total": 100,
//     "order_items": [
//         {
//             "product_id": 1,
//             "quantity": 1,
//             "price": 100
//         },
//         {
//             "product_id": 2,
//             "quantity": 1,
//             "price": 100
//         }
//     ]
// }

async function readUserId(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                id: true,
            },
        });
        return user?.id || '';;
    } catch (error) {
        return "";
    }
}

async function hasAddress(user_id: string) {
    try {
        const address = await prisma.addresses.findMany({
            where: {
                user_id: user_id,
            },
            select: {
                id: true,
            },
        });
        return address;
    } catch (error) {
        return [];
    }
}

async function updateName(user_id: string, name: string) {
    try {
        await prisma.user.update({
            where: {
                id: user_id,
            },
            data: {
                name: name,
            },
        });
        return true;
    } catch (error) {
        return false;
    }
}

async function updateAddress(user_id: string, address: string, city: string, state: string, postal: string, phone: string) {
    try {
        const hasAddressResult = await hasAddress(user_id);
        if (hasAddressResult.length === 0) {
            const newAddress = await prisma.addresses.create({
                data: {
                    user_id: user_id,
                    address: address,
                    city: city,
                    state: state,
                    postal: postal,
                    phone: phone
                },
            });
            return true;
        }
        else {
            await prisma.addresses.updateMany({
                where: {
                    id: hasAddressResult[0].id,
                },
                data: {
                    address: address,
                    city: city,
                    state: state,
                    postal: postal,
                    phone: phone
                },
            });
            return true;
        }
    } catch (error) {
        return false;
    }
}

async function insertOrder(user_id: string, address: string, total: number) {
    try {
        const order = await prisma.orders.create({
            data: {
                address: address,
                user: { connect: { id: user_id } },
                total: total,
            },
        });
        return order?.id;
    } catch (error) {
        return false;
    }
}


async function insertOrderItems(order_id: string, order_items: OrderItem[]) {
    try {
        // console.log('order_id', order_id);
        // console.log('order_items', order_items);
        await prisma.orderItems.createMany({
            data: order_items.map((item) => {
                return {
                    order_id: order_id,
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price: item.price,
                };
            }),
        });
        return true;
    } catch (error) {
        // console.log('insertOrderItems Error', error);
        return false;
    }
}

// 5 Main Operation should be done here
// ----check if user exists from email----
// 1- Update Name in user table
// 2- Update Address in address table
// 3- Insert Order in order table [user_id,total]
// 4- Insert Order Items in order_items table [order_id,product_id,quantity,price]
// 5- Delete Cart Items in cart_items table [product_id, cookie_id]
export async function POST(request: Request) {
    const { name,
        email,
        phone,
        address,
        city,
        state,
        postal,
        total,
        order_items
    }: CheckoutSchema = await request.json();
    // console.log('checkout', name,
    //     email,
    //     phone,
    //     address,
    //     city,
    //     state,
    //     postal,
    //     total,
    //     order_items);
    const addressForOrder = `${address}, ${city}, ${state}, ${postal}`;

    try {
        const user_id = await readUserId(email);
        if (user_id === "") {
            return new Response(JSON.stringify({ success: "No user" }), { status: 404 });
        }
        const updateNameResult = await updateName(user_id, name);
        if (!updateNameResult) {
            return new Response(JSON.stringify({ success: "updateName Error" }), { status: 404 });
        }
        const updateAddressResult = await updateAddress(user_id, address, city, state, postal, phone);
        if (!updateAddressResult) {
            return new Response(JSON.stringify({ success: "updateAddress Error" }), { status: 404 });
        }
        const order_id = await insertOrder(user_id, addressForOrder, total);
        if (!order_id) {
            return new Response(JSON.stringify({ success: "insertOrder Error" }), { status: 404 });
        }
        const insertOrderItemsResult = await insertOrderItems(order_id, order_items);
        if (!insertOrderItemsResult) {
            return new Response(JSON.stringify({ success: "insertOrderItems Error" }), { status: 404 });
        }
        // delete the cart items from db

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    catch (error) {
        console.log('cart checkout route Error');
        return new Response(JSON.stringify({ success: 'cart checkout route Error' }), { status: 500 });
    }

}
