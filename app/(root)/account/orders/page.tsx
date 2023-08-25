
import React from "react";

import { ProfileLinks } from "@/components/ui/profileLinks";



export default async function Orders() {


    return (

        <div className="w-full p-20">
            <h1 className="text-2xl font-medium	text-current text-center">Orders</h1>
            <section className="flex flex-col rounded-md items-start ">

                <div className="flex flex-col items-start justify-between mt-10 bg-gray-200	 w-full h-16">
                    <div className="flex flex-row justify-between items-center w-full px-7 pt-1">
                        <p className="text-lg text-gray-500">Order Placed</p>
                        <p className="text-lg text-gray-500">Total</p>
                        <p className="text-lg text-gray-500">Address</p>
                        <p className="text-lg text-gray-500">phone Number</p>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full px-7 pt-1">
                        <p className="text-lg text-gray-500">June 3, 2023</p>
                        <p className="text-lg text-gray-500"></p>
                        <p className="text-lg text-gray-500">Address</p>
                        <p className="text-lg text-gray-500">phone Number</p>
                    </div>
                </div>
            </section>

        </div>
    )
}
