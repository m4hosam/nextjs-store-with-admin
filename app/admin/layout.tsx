import '@/app/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import prismadb from '@/lib/prismadb'
import { Navbar } from '@/components/Navbar'
import { Card } from '@/components/Card'
import { SearchBar } from '@/components/ui/searchBar'
import { Button } from '@/components/ui/button'



export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <div>
            <Navbar />
            {children}
        </div>

    )
}