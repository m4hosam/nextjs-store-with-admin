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
import { updateUser } from "@/lib/actions";


type props = {
    name: any,
    email: any,
    image: any,
}

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
    // phone: z.string().min(10, {
    //     message: "phone must be at least 10 characters.",
    // }),
})

export function ProfileForm(props: props) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: props.name,
            // Add default values for other fields if needed
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        // console.log(data)
        const updateUserStatus = await updateUser(data.name)
        if (updateUserStatus) {
            toast.success('Information has been updated')
        } else {
            toast.error('Something went wrong')
        }
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

                    <Input placeholder="email" value={props.email} disabled />
                    <FormMessage />
                </FormItem>

                {/* <FormField
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
                /> */}
                <Button type="submit">Save</Button>
            </form>
        </Form>
    )
}
