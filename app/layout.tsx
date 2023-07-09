import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import prismadb from '@/lib/prismadb'
import { Navbar } from '@/components/Navbar'
import { Card } from '@/components/Card'
import { SearchBar } from '@/components/ui/searchBar'

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
        <Navbar />
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
        {children}
      </body>
    </html>
  )
}
