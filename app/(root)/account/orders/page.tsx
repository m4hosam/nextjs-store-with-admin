
import React from "react";

import { ProfileLinks } from "@/components/ui/profileLinks";
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth/next"
import { OrdersCard } from "@/components/cards/ordersCard";
import { getOrders } from "@/lib/actions";
import { redirect } from "next/navigation"
import { SimpleOrder } from "@/common.types";


export default async function Orders() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/account/login')
    }
    const orders = await getOrders(session.user?.email || "") as SimpleOrder[]
    // console.log("orders", orders[0].OrderItems)

    return (
        <main className="w-full p-5 md:p-20 ">
            <h1 className="text-2xl font-medium	text-current text-center">Orders</h1>
            {
                orders.map((order) => (
                    <OrdersCard
                        key={order.id}
                        id="1"
                        createdAt={order.createdAt}
                        total={order.total}
                        address={order.address}
                        OrderItems={order.OrderItems}
                    />
                ))
            }
            {/* <OrdersCard
                createdAt={orders[0].createdAt}
                total={orders[0].total}
                address={orders[0].address}
                OrderItems={orders[0].OrderItems}
            /> */}

        </main>

    )
}