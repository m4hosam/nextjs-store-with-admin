"use client"
import React from "react";
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
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
    phone: z.string().min(10, {
        message: "phone must be at least 10 characters.",
    }),
})


export default async function Account() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "Tom",
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormItem>
                    <FormLabel>email</FormLabel>

                    <Input placeholder="email" value="smisdf@fsd.sdf" disabled />
                    <FormMessage />
                </FormItem>

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>phone</FormLabel>
                            <FormControl>
                                <Input placeholder="+20 ..." {...field} />
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
