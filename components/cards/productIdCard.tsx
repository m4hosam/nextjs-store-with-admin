"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { productSchema } from "@/common.types";
import { addToCart } from '@/lib/actions'
import { useShoppingCart } from "@/context/ShoppingCartContext"
import toast, { Toaster } from 'react-hot-toast';
import { set } from 'react-hook-form';

export const ProductIdCard = ({ id, name, brand, price, category, image }: productSchema) => {
    const {
        getItemQuantity,
        increaseCartQuantity,
    } = useShoppingCart()
    const [isLoading, setisLoading] = useState(false)
    const quantity = getItemQuantity(id)
    // console.log(quantity)

    const handleAddToCart = async () => {
        setisLoading(true)
        await addToCart(id, quantity + 1)
        increaseCartQuantity(id)
        setisLoading(false)
        toast.success('Product has been added to cart')
        // console.log('add to cart')
        // createCookie({ name: 'cart', value: '456872' })
    }


    return (
        <div className="lg:w-4/5 mx-auto flex flex-wrap items-center justify-center">
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            <Image
                alt="ecommerce"
                className="lg:w-2/5 w-full lg:h-auto object-cover object-center rounded"
                src={image}
                width={200}
                height={500}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">{category}</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{brand}</h1>
                <div className="flex mb-4">
                    {/* <span className="flex items-center">
                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <span className="text-gray-600 ml-3">4 Reviews</span>
                    </span> */}

                </div>
                <p className="leading-relaxed">
                    {name}
                </p>

                <div className="flex flex-col items-start gap-5 justify-between mt-6">
                    <span className="title-font font-medium text-2xl text-gray-900">{price} EGP</span>
                    <button onClick={handleAddToCart} className="flex flex-row items-center text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">

                        <svg aria-hidden="true" role="status" className={` w-4 h-4 mr-3 text-white animate-spin ${isLoading ? "inline" : "hidden"}`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                        Add to cart
                    </button>

                </div>
            </div>
        </div>
        // <div className="flex flex-col  justify-between items-center
        // w-60 max-w-sm bg-white border
        // border-gray-200 rounded-lg shadow
        // dark:bg-gray-800 dark:border-gray-700 m-7"
        // >
        // <Toaster
        //     position="bottom-right"
        //     reverseOrder={false}
        // />
        //     <div className='w-full h-52'>
        //         <Image className="rounded-lg object-contain object-center px-4 pt-4"
        //             src={image}
        //             width={300}
        //             height={100}
        //             alt="product image"
        //             style={{
        //                 width: '100%',
        //                 height: '100%',
        //                 objectFit: 'cover', // or 'contain' if you prefer
        //             }}
        //         />
        //     </div>
        //     <h6 className="text-base text-center px-5 py-2 font-semibold tracking-tight text-slate-800 dark:text-white">
        //         {brand}
        //     </h6>
        //     <h5 className="text-lg text-right h-28 px-5 py-2 tracking-tight leading-normal text-slate-500	 dark:text-white">
        //         {name}
        //     </h5>
        //     <div className="flex px-6 pt-2 mb-6 items-center justify-between">
        //         <span className="text-2xl font-medium text-lime-800 dark:text-white">
        //             {price} LE
        //         </span>
        //     </div>
        //     <button onClick={handleAddToCart} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-b-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

        // <svg aria-hidden="true" role="status" className={` w-4 h-4 mr-3 text-white animate-spin ${isLoading ? "inline" : "hidden"}`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
        //     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
        // </svg>
        // Add to cart
        //     </button>

        // </div>
    )
}

