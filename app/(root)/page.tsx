import Image from 'next/image'
import { Card } from '@/components/Card'
import { SearchBar } from '@/components/ui/searchBar'


export default function Home() {
    return (
        <main >
            <section className='mt-16'>
                <h1 className='text-3xl w-full text-center font-bold'>Products</h1>
                <SearchBar />
                <div className='flex w-full flex-row flex-wrap justify-center px-7'>
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
            </section>
        </main>
    )
}
