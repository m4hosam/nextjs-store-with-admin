
import { CartProps, SimpleOrder } from "@/common.types"
import Image from "next/image"
import { ProductCard } from "@/components/cards/productOrders";
import { Separator } from "@/components/ui/separator";


export const OrdersCard = ({ createdAt, total, address, OrderItems }: SimpleOrder) => {
    const date = new Date(createdAt)
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDay = date.getDate();
    const together = [currentYear, currentMonth, currentDay].join('/');
    return (
        <div className="flex flex-col w-full rounded-md items-start  border mt-10">
            <section className="flex flex-row items-center justify-between  bg-gray-200 p-10 w-full h-16">
                <div className="flex flex-col justify-between items-center">
                    <p className="text-lg text-gray-500">Order Placed</p>
                    <p className="text-lg text-gray-900">{together}</p>
                </div>
                <div className="flex flex-col justify-between items-center">
                    <p className="text-lg text-gray-500">Total</p>
                    <p className="text-lg text-gray-900">{total}</p>
                </div>
                <div className="flex flex-col justify-between items-center">
                    <p className="text-lg text-gray-500">phone Number</p>
                    <p className="text-lg text-gray-900">5555!!</p>
                </div>
                <div className="flex flex-col justify-between items-center">
                    <p className="text-lg text-gray-500 w-48">Address</p>
                    <p className="text-lg text-gray-900 w-48">{address}</p>
                </div>
                <div className="flex flex-col justify-between items-center">
                    <p className="text-lg text-gray-500">Status</p>
                    <p className="text-lg text-gray-900">On Progress !!!</p>
                </div>
            </section>
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
