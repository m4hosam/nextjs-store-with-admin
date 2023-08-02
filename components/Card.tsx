"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { CardProps } from "@/common.types";
import { createCookie } from '@/app/actions'
import { useShoppingCart } from "@/context/ShoppingCartContext"



export const Card = ({ id, name, brand, price, image }: CardProps) => {

    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
    } = useShoppingCart()

    const quantity = getItemQuantity(id)
    // console.log(quantity)

    const handleAddToCart = () => {
        increaseCartQuantity(id)
        console.log('add to cart')
        createCookie({ name: 'cart', value: '456872' })
    }


    return (
        <div className="flex flex-col justify-between items-center
        w-60 max-w-sm bg-white border
        border-gray-200 rounded-lg shadow
        dark:bg-gray-800 dark:border-gray-700 m-7"
        >
            <Link href={`/products/${id}`}>
                <div className='w-full h-52'>
                    <Image className="rounded-lg object-contain object-center px-4 pt-4"
                        src={image}
                        width={300}
                        height={100}
                        alt="product image"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover', // or 'contain' if you prefer
                        }}
                    />
                </div>
            </Link>
            <Link href={`/products/${brand}`}>
                <h6 className="text-base text-center px-5 py-2 font-semibold tracking-tight text-slate-800 dark:text-white">
                    {brand}
                </h6>
            </Link>
            <Link href={`/products/${id}`}>
                <h5 className="text-lg text-right h-28 px-5 py-2 tracking-tight leading-normal text-slate-500	 dark:text-white">
                    {name}
                </h5>
            </Link>
            <div className="flex px-6 pt-2 mb-6 items-center justify-between">
                <span className="text-2xl font-medium text-lime-800 dark:text-white">
                    {price} LE
                </span>
            </div>
            <button onClick={handleAddToCart} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-b-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Add to cart
            </button>

        </div>
    )
}

