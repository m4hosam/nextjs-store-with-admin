import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import prismadb from '@/lib/prismadb'
import { Navbar } from '@/components/navbar'
import { Card } from '@/components/card'
import { SearchBar } from '@/components/ui/searchBar'
import { Button } from '@/components/ui/button'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">

      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
