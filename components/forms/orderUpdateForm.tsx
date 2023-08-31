"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import FormField from "@/components/ui/formField"
import { orderUpdateAdmin } from '@/common.types';
import { orderStatusFilters } from '@/constant';
import CustomMenu from '@/components/ui/customMenu';
import { updateOrder } from '@/lib/actionAdmin'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

type Props = orderUpdateAdmin & {
    id: string
}



export default function OrderUpdateForm({ id, address, status, total }: Props) {
    const router = useRouter();
    const [form, setform] = useState<orderUpdateAdmin>({
        address: address,
        status: status,
        total: total,
    })

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Send form object to backend
        try {
            console.log(form)
            // Send form object to backend using fetch
            const data = await updateOrder(id, form)

            if (!data) {
                // Handle any error scenarios if needed
                console.error('Form submission failed.');
                return;
            } else {
                toast.success('Successfully toasted!')
                //this will reload the page without doing SSR
                router.refresh();
            }



        } catch (error) {
            // Handle any network or other errors
            console.error('Error occurred while submitting the form:', error);
        }
    }

    const handleStateChange = (state: string, value: string) => {

        setform({
            ...form,
            [state]: value
        })
    }

    return (
        <form
            onSubmit={handleFormSubmit}
            className="w-full flex justify-around lg:px-32 md:px-14 px-5 py-7 gap-7 flex-wrap"
        >
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />

            <CustomMenu
                title="Status"
                state={form.status}
                filters={orderStatusFilters}
                setState={(value) => handleStateChange('status', value)}
            />
            <FormField
                title="Address"
                type="text"
                state={form.address}
                placeholder="Address"
                setState={(value) => { handleStateChange('address', value) }}

            />
            <FormField
                title="Total"
                state={form.total}
                type="text"
                placeholder="Total"
                setState={(value) => { handleStateChange('total', value) }}

            />

            <Button >Update Order</Button>

        </form>
    )
}
