import React from 'react'
import Image from 'next/image'
// import watch from '@/public/assets/watch.webp'

type CardProps = {
    name: string;
    description: string;
    price: string;
    image: string;
};


export const Card = ({ name, description, price, image }: CardProps) => {
    return (
        <div className="flex flex-col justify-between items-center
        w-60 max-w-sm bg-white border
        border-gray-200 rounded-lg shadow
        dark:bg-gray-800 dark:border-gray-700 m-7"
        >
            <a href="#">
                <Image className="rounded-t-lg px-6 pt-6"
                    src={image}
                    width={500}
                    height={500}
                    alt="product image" />
            </a>
            <a href="#">
                <h5 className="text-xl text-center p-6 font-semibold tracking-tight text-gray-900 dark:text-white">
                    {name}
                </h5>
            </a>
            <div className="flex px-6 mb-6 items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {price} EGP
                </span>
            </div>
            <a href="#" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-b-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Add to cart
            </a>

        </div>
    )
}

