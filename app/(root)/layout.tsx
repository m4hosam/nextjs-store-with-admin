import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import prismadb from '@/lib/prismadb'
import { Navbar } from '@/components/navbarUser'
import { Card } from '@/components/card'
import { SearchBar } from '@/components/ui/searchBar'
import { Button } from '@/components/ui/button'
import { ShoppingCartProvider } from "@/context/ShoppingCartContext"


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <ShoppingCartProvider>
            <Navbar />
            {children}
        </ShoppingCartProvider>

    )
}
