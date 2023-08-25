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
        console.log(createOrderResult)
        if (createOrderResult.success) {
            toast.success('Information has been updated')
            // redirect to orders page
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="block w-full md:w-1/2 space-y-6 mb-7 p-7">
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
                <Button type="submit" className="w-full">Complete Order</Button>
            </form>
        </Form>
    )
}