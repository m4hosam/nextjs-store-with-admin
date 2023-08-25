"use client"
import React from 'react'
import { CartItem } from '@/components/cartItem'
import { CartProps } from '@/common.types'
import { getProductsInCart, getCartItems } from '@/lib/actions'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function Cart() {
    const [productsInCart, setproductsInCart] = useState<CartProps[]>([])

    useEffect(() => {
        async function fetchProducts() {
            const products = await getProductsInCart()
            setproductsInCart(products)
            console.log(products)
        }
        fetchProducts()
    }, [])
    const total = productsInCart.reduce((acc, product) => acc + product.price * product.quantity, 0)
    const shippingFees = 20
    return (
        <div className="flex flex-col  py-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            {productsInCart.length !== 0 && (
                <div className="flex items-start flex-col w-full md:flex-row mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3">
                        {productsInCart.map((product) => (
                            <CartItem
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
                    </div>

                    <div className="flex flex-col items-center justify-start w-full mt-6 rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                        <div className="mb-2 flex justify-between w-full">
                            <p className="text-gray-700">Subtotal</p>
                            <p className="text-gray-700">{total} EGP</p>
                        </div>
                        <div className="flex justify-between  w-full">
                            <p className="text-gray-700">Shipping</p>
                            <p className="text-gray-700">{shippingFees} EGP</p>
                        </div>
                        <hr className="my-4 w-full" />
                        <div className="flex justify-between  w-full">
                            <p className="text-lg font-bold">Total</p>
                            <p className="mb-1 text-lg font-bold">{total + shippingFees} EGP</p>
                        </div>

                        <a href="/cart/checkout" className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-center text-blue-50 hover:bg-blue-600">Check out</a>
                    </div>
                </div>

            )}


        </div>
    )
}
