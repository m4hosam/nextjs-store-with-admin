"use client"
import { useEffect, useState } from "react";
import { Card } from "@/components/card";
import { SearchBar } from "@/components/ui/searchBar";
import axios from "axios";

type CardProps = {
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
            <section className='mt-16'>
                <h1 className='text-3xl w-full text-center font-bold'>Products</h1>
                <SearchBar />
                <div className='flex w-full flex-row flex-wrap justify-center px-7'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        products.map((product, index) => (
                            <Card
                                key={index}
                                name={product.name}
                                description={product.description}
                                price={product.price}
                                image={product.image}
                            />
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}
