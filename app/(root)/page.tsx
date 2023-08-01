import { Card } from "@/components/card";
import { SearchBar } from "@/components/ui/searchBar";
import { productSchema } from "@/common.types";
import { getProducts } from "@/lib/actions";
import { Key } from "react";

export default async function Home() {

    const products = await getProducts()
    // console.log(products)

    return (
        <main>
            <section className='mt-16'>
                <h1 className='text-3xl w-full text-center font-bold'>Products</h1>
                <SearchBar />
                <div className='flex w-full flex-row flex-wrap justify-center px-7'>
                    {
                        products?.map((product: { id: string; name: string; brand: string; price: string; image: string; }, index: Key | null | undefined) => (
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
