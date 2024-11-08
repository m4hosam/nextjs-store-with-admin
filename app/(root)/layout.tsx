import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import prismadb from '@/lib/prismadb'
import { Navbar } from '@/components/navbarUser'
import { Card } from '@/components/cards/card'
import { SearchBar } from '@/components/ui/searchBar'
import { Button } from '@/components/ui/button'
import { ShoppingCartProvider } from "@/context/ShoppingCartContext"
import AuthProvider from "@/context/AuthProvider";


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (

        <AuthProvider>
            <ShoppingCartProvider>

                <Navbar />
                {children}
            </ShoppingCartProvider>
        </AuthProvider>


    )
}
