
import { CartProps, SimpleOrder } from "@/common.types"
import Image from "next/image"
import { ProductCard } from "@/components/cards/productOrders";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const OrdersCard = ({ createdAt, total, address, OrderItems }: SimpleOrder) => {
    const date = new Date(createdAt)
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();
    const orderDate = [currentYear, currentMonth, currentDay].join('/');
    return (
        <div className="flex flex-col w-full rounded-md items-start  border mt-10">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-200">
                        <TableHead className="text-left">Order Placed</TableHead>
                        <TableHead className="text-center">Total</TableHead>
                        <TableHead className="text-center">Address</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow >

                        <TableCell className="text-left">{orderDate}</TableCell>
                        <TableCell className="text-center">{total}</TableCell>
                        <TableCell className="text-center">{address}</TableCell>
                        <TableCell className="text-center">On Progress !!!</TableCell>

                    </TableRow>

                </TableBody>
            </Table>
            <Separator />
            <section className="flex flex-col w-full">
                {OrderItems.map((item) => (
                    <ProductCard
                        key={item.product.name}
                        product_id="1"
                        name={item.product.name}
                        brand={item.product.brand}
                        image={item.product.image}
                        price={Number(item.price)}
                        category=""
                        quantity={item.quantity}
                    />
                ))}


            </section>
        </div>
    );
}
