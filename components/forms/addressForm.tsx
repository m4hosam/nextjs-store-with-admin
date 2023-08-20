"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast, { Toaster } from 'react-hot-toast';

const FormSchema = z.object({
    address: z.string().min(10, {
        message: "address must be at least 10 characters.",
    }),
    city: z.string().min(2, {
        message: "city must be at least 2 characters.",
    }),
    state: z.string().min(2, {
        message: "state must be at least 2 characters.",
    }),
    postalCode: z.string().min(5, {
        message: "Postal Code must be at least 5 digits.",
    }),
    phone: z.string().min(11, {
        message: "phone must be at least 11 characters.",
    }),
})

export function AddressForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            address: "Addressdfsdfffffffffffffffffffffffff",
            city: "City",
            state: "State",
            postalCode: "Postal Code",
            phone: "01000000000",

            // Add default values for other fields if needed
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        toast.success('Information has been updated')
    }

    return (
        <Form {...form}>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:w-2/3 space-y-6 mb-7">
                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="Address" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input placeholder="State" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                                <Input placeholder="Postal Code" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>phone</FormLabel>
                            <FormControl>
                                <Input placeholder="0100.." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Save</Button>
            </form>
        </Form>
    )
}
