import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card } from '@/components/Card-Admin'
import { SearchBar } from '@/components/ui/searchBar'
import Link from 'next/link'


export default function Home() {
    return (
        <main>

            <Link href="/admin/addproduct" className="w-52 text-white bg-blue-700
                     hover:bg-blue-800 focus:ring-4
                     focus:outline-none focus:ring-blue-300 
                     font-medium rounded-lg text-sm px-5
                     py-2.5 text-center dark:bg-blue-600
                     dark:hover:bg-blue-700
                     dark:focus:ring-blue-800 ml-28">
                + Add New Product
            </Link>

            <SearchBar />

            <div className='flex w-full flex-row flex-wrap justify-center'>
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div>
        </main>
    )
}
