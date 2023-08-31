
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getOrder } from '@/lib/actionAdmin'
import { orderGetPropsAdmin, SimpleOrder } from '@/common.types'
import { Link } from "lucide-react"
import { OrdersCard } from "@/components/cards/ordersCard";
import OrderUpdateForm from "@/components/forms/orderUpdateForm";

export default async function Order({ params: { id } }: { params: { id: string } }) {
    const order = await getOrder(id) as SimpleOrder
    // console.log("order in order id", order.OrderItems)
    return (
        <main className="p-4 sm:p-14">
            <OrdersCard
                id={id}
                createdAt={order.createdAt}
                total={order.total}
                address={order.address}
                status={order.status}
                OrderItems={order.OrderItems}
            />
            <OrderUpdateForm
                id={id}
                address={order.address}
                status={order.status}
                total={order.total}
            />

        </main>
    )
}
