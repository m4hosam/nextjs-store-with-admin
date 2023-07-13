
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


export default function Sales() {
    return (
        <main className="p-14">
            <Table>
                <TableCaption>All Sales</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Image</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Profit per piece</TableHead>
                        <TableHead className="text-right">Sold Amount</TableHead>
                        <TableHead className="text-right">Total Profit</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">IMAGE</TableCell>
                        <TableCell>Rolex Watch Copy Cat</TableCell>
                        <TableCell>569 EGP</TableCell>
                        <TableCell>60 EGP</TableCell>
                        <TableCell className="text-right">2</TableCell>
                        <TableCell className="text-right">120 EGP</TableCell>
                    </TableRow>
                </TableBody>
            </Table>



        </main>
    )
}
