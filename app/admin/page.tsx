"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card } from '@/components/cardAdmin'
import { SearchBar } from '@/components/ui/searchBar'
import Link from 'next/link'

type CardProps = {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
};

export default function Home() {
    const [products, setProducts] = useState<CardProps[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('/api/products/read').then((response) => {
            console.log(response.data);
            setProducts(response.data);
            setLoading(false);
        });
    }, []);

    return (
        <main>
            <section className='w-full flex flex-row justify-between px-16 mt-12'>

                <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Products</h3>

                <Link href="/admin/addproduct" className="w-52 text-white bg-blue-700
                     hover:bg-blue-800 focus:ring-4 rounded-md
                     focus:outline-none focus:ring-blue-300 
                     font-medium text-sm px-5
                     py-2.5 text-center dark:bg-blue-600
                     dark:hover:bg-blue-700
                     dark:focus:ring-blue-800 ml-28">
                    + Add New Product
                </Link>
            </section>
            <hr className="my-5 mx-16" />
            <br className='w-full h-7 bg-slate-500' />

            <SearchBar />
            <div className='flex w-full flex-row flex-wrap justify-center px-7'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    products.map((product, index) => (
                        <Card
                            key={index}
                            id={product.id}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            image={product.image}
                        />
                    ))
                )}
            </div>
        </main>
    )
}
