import prisma from '@/lib/prismadb';



// async function updateOrderItems(order_id: string, order_items: OrderItem[]) {
//     try {
//         // console.log('order_id', order_id);
//         // console.log('order_items', order_items);
//         await prisma.orderItems.createMany({
//             data: order_items.map((item) => {
//                 return {
//                     order_id: order_id,
//                     product_id: item.product_id,
//                     quantity: item.quantity,
//                     price: item.price,
//                 };
//             }),
//         });
//         return true;
//     } catch (error) {
//         // console.log('insertOrderItems Error', error);
//         return false;
//     }
// }

export async function GET(request: Request, { params }: { params: { id: string } }) {

    try {
        const order = await prisma.orders.findMany({
            where: {
                id: params.id
            },
            select: {
                id: true,
                total: true,
                address: true,
                status: true,
                OrderItems: {
                    select: {
                        price: true,
                        quantity: true,
                        product: {
                            select: {
                                name: true,
                                brand: true,
                                image: true,

                            },
                        },
                    },
                },
                createdAt: true,
            },
        });
        if (!order) {
            return new Response(JSON.stringify({ message: "Product Not Found" }), { status: 404 });
        }

        // Return the products in the response
        return new Response(JSON.stringify(order), { status: 200 });
    } catch (error) {
        console.error('Error fetching specific order:', error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }

}

type orderUpdateProps = {
    address: string;
    total: number;
    status: string;
}


export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { address, total, status }: orderUpdateProps = await request.json();

    try {

        const UpdatedOrderCount = await prisma.orders.update({
            where: {
                id: params.id,
            },
            data: {
                address: address,
                status: status,
                total: total,
            },
        });

        // Return the products in the response
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error fetching specific order:', error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }

}