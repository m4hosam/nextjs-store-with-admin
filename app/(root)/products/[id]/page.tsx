import React from 'react'
import Image from 'next/image'
import { ProductIdCard } from "@/components/cards/productIdCard"
import { getProduct } from '@/lib/actions'
import { productSchema } from '@/common.types'

export default async function Product({ params: { id } }: { params: { id: string } }) {
    const { name, brand, price, image, category } = await getProduct(id) as productSchema
    // console.log("Product in product id", product)

    return (
        <section className="text-gray-700 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <ProductIdCard id={id} name={name} brand={brand} category={category} price={price} image={image} stock_price={0} />

            </div>
        </section>
    )
}
