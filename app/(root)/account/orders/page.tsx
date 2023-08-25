
import React from "react";

import { ProfileLinks } from "@/components/ui/profileLinks";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export default async function Orders() {


    return (

        <div className="w-full p-20">
            <h1 className="text-2xl font-medium	text-current text-center">Orders</h1>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <Table>
                        <TableCaption>Orders</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Order Id</TableHead>
                                <TableHead>Order Placed</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead className="text-right">Address</TableHead>
                                <TableHead className="text-right">Details</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow >

                                <TableCell className="font-medium">#23566</TableCell>
                                <TableCell>June 16, 2023</TableCell>
                                <TableCell>258</TableCell>
                                <TableCell className="text-right">Giza, Cairo</TableCell>
                                <TableCell className="text-right">V</TableCell>

                            </TableRow>

                        </TableBody>
                    </Table>
                </AccordionItem>
            </Accordion>
        </div>
    )
}
