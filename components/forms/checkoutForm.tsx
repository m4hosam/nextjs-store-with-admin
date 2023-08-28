"use client"
import { useState, useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Address, CheckoutFormProps, CheckoutSchema } from "@/common.types"
import { updateAddress } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ProductCard } from "@/components/cards/productOrders"
import { Separator } from "@/components/ui/separator";
import { CartProps } from '@/common.types'
import { getProductsInCart, createCheckoutOrder } from '@/lib/actions'
import { redirect } from 'next/navigation'

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
    address: z.string().min(10, {
        message: "address must be at least 10 characters.",
    }),
    city: z.string().min(2, {
        message: "city must be at least 2 characters.",
    }),
    state: z.string().min(2, {
        message: "state must be at least 2 characters.",
    }),
    postal: z.string().min(5, {
        message: "Postal Code must be at least 5 digits.",
    }),
    phone: z.string().min(11, {
        message: "phone must be at least 11 characters.",
    }),
})

export function CheckoutForm({ address, city, state, postal, phone, email, name }: CheckoutFormProps) {
    const [productsInCart, setproductsInCart] = useState<CartProps[]>([])
    const [Total, setTotal] = useState<number>(0)
    const [loading, setloading] = useState(false)
    const shippingFees = 20
    useEffect(() => {
        async function fetchProducts() {
            const products = await getProductsInCart()
            for (let i = 0; i < products.length; i++) {
                setTotal((prev) => prev + products[i].price * products[i].quantity)
            }
            setproductsInCart(products)
            // console.log(products)
        }
        fetchProducts()
    }, [])



    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: name,
            address: address,
            city: city,
            state: state,
            postal: postal,
            phone: phone,

            // Add default values for other fields if needed
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setloading(true)
        const order_items = productsInCart.map((product) => {
            return {
                product_id: product.product_id,
                quantity: product.quantity,
                price: Number(product.price)
            }
        })
        const order = {
            ...data,
            email: email,
            total: Total + shippingFees,
            order_items: order_items,
        }
        console.log(order)
        const createOrderResult = await createCheckoutOrder(order as CheckoutSchema)
        setloading(false)
        console.log(createOrderResult)
        if (createOrderResult.success) {
            toast.success('Order has been created successfully')
            // redirect to orders page
            window.location.href = "/account/orders";
        }
        else {
            toast.error('Something went wrong')
        }

    }

    return (
        <Form {...form}>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <div className="w-full p-14 bg-gray-100 lg:w-1/2 ">

                <h1 className=" text-slate-900 text-2xl font-medium mb-5">Order Summary</h1>
                {productsInCart.map((product) => (
                    <ProductCard
                        key={product.product_id}
                        product_id={product.product_id}
                        name={product.name}
                        brand={product.brand}
                        price={product.price}
                        category={product.category}
                        image={product.image}
                        quantity={product.quantity}
                    />

                ))}


                <div className="flex flex-row w-full justify-between mb-5">
                    <p className="text-slate-700 text-xl font-medium">SubTotal</p>
                    <p className="text-slate-900 text-xl font-medium">{Total} LE</p>
                </div>
                <div className="flex flex-row w-full justify-between">
                    <p className="text-slate-700 text-xl font-medium">Shipping</p>
                    <p className="text-slate-900 text-xl font-medium">{shippingFees} LE</p>
                </div>
                <Separator className="my-4" />
                <div className="flex flex-row w-full justify-between">
                    <p className="text-slate-700 text-xl font-medium">Total</p>
                    <p className="text-slate-900 text-xl font-medium">{Total + shippingFees} LE</p>
                </div>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className="block w-full lg:w-1/2 space-y-6 mb-7 p-7">
                <h2 className="text-2xl font-medium">Personal Data</h2>
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

                    <Input placeholder="email" value={email} disabled />
                    <FormMessage />
                </FormItem>


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


                {/* <Separator className="my-4" /> */}
                <h2 className="text-2xl font-medium">Shipping Details</h2>

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
                    name="postal"
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
                {/* <Separator className="my-9" /> */}
                <h2 className="text-2xl font-medium">Payment Details</h2>
                <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2 my-3">
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">Payment on delivary</Label>
                    </div>
                </RadioGroup>

                <Separator />
                <Button type="submit" className="w-full">
                    {
                        loading ? (

                            <svg aria-hidden="true" role="status" className="w-4 h-4  text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                        )
                            :
                            (

                                "Complete Order"
                            )
                    }
                </Button>
            </form>
        </Form>
    )
}
