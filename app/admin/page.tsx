import { Card } from "@/components/cards/card";
import { SearchBar } from "@/components/ui/searchBar";
import { productSchema } from "@/common.types";
import { getProducts } from "@/lib/actions";
import Link from 'next/link';
import { Key } from "react";

export default async function Home() {

    const products = await getProducts()

    return (
        <main>
            <section className='mt-16'>
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

                {/* <SearchBar /> */}

                <div className='flex w-full flex-row flex-wrap justify-center px-7'>
                    {
                        products.map((product: { id: string; name: string; brand: string; price: string; image: string; }, index: Key | null | undefined) => (
                            <Card
                                key={index}
                                id={product.id}
                                name={product.name}
                                brand={product.brand}
                                price={product.price}
                                image={product.image}
                            />
                        ))
                    }
                </div>
            </section>
        </main>
    );
}

