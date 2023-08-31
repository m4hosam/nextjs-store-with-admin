
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
import { getOrders } from '@/lib/actionAdmin'
import { orderGetPropsAdmin } from '@/common.types'
import Link from "next/link";
import { Link as LinkIcon } from "lucide-react"

export default async function Orders() {
    const orders = await getOrders() as orderGetPropsAdmin[]
    console.log("-------------------------\n", orders)
    for (const order of orders) {
        const date = new Date(order.createdAt)
        const currentYear = date.getFullYear();
        const currentMonth = date.getMonth() + 1;
        const currentDay = date.getDate();
        const orderDate = [currentYear, currentMonth, currentDay].join('/');
        order.createdAt = orderDate
    }
    // const date = new Date(createdAt)
    // const currentYear = date.getFullYear();
    // const currentMonth = date.getMonth() + 1;
    // const currentDay = date.getDate();
    // const orderDate = [currentYear, currentMonth, currentDay].join('/');

    return (
        <main className="p-14">
            <Table>
                <TableCaption>All Orders</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-medium">Order Date</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Total Price</TableHead>
                        <TableHead>Status</TableHead>
                        {/* <TableHead >phone</TableHead> */}
                        <TableHead className="text-right">Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (

                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.createdAt}</TableCell>
                            <TableCell>{order.address}</TableCell>
                            <TableCell>{order.total}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            {/* <TableCell >0000000000</TableCell> */}
                            <TableCell className="text-right">
                                <Link href={`/admin/orders/${order.id}`}>
                                    <LinkIcon
                                        className="text-blue-500 ml-auto"
                                    />

                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>



        </main>
    )
}
