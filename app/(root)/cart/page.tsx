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

    return (
        <div className="h-screen bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
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
                    {/* <CartItem
                        id="f342a929-2f93-4ff5-9f61-36535a4768e7"
                        name="Rolex Watch leather strap"
                        brand="Rolex"
                        price='250 EGP'
                        category='Watches'
                        image='/assets/Metalhandwatchhighcopy-1690749112645.png'
                        quantity={1}
                    /> */}
                </div>

                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <div className="mb-2 flex justify-between">
                        <p className="text-gray-700">Subtotal</p>
                        <p className="text-gray-700">$129.99</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-gray-700">Shipping</p>
                        <p className="text-gray-700">$4.99</p>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div className="">
                            <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                            <p className="text-sm text-gray-700">including VAT</p>
                        </div>
                    </div>

                    <Link href="/cart/checkout" className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</Link>
                </div>
            </div>
        </div>
    )
}
