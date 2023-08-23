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
        await prisma.addresses.updateMany({
            where: {
                user_id: user_id,
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
    } catch (error) {
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

    try {


        return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    catch (error) {
        console.log('isThereACookie database Error');
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }

}
