import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import prismadb from '@/lib/prismadb'
import { Navbar } from '@/components/navbarAdmin'
import { Card } from '@/components/cards/card'
import { SearchBar } from '@/components/ui/searchBar'
import { Button } from '@/components/ui/button'
import { ShoppingCartProvider } from "@/context/ShoppingCartContext"


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <div>
            <ShoppingCartProvider>

                <Navbar />
                {children}
            </ShoppingCartProvider>

        </div>

    )
}
