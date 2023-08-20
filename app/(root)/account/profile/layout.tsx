"use client"
import React from 'react'
import Link from "next/link";
import { useRouter } from 'next/router';


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()

    return (
        <div className="flex flex-col justify-between w-full sm:flex-row  sm:m-20">
            <p>
                pathname:- {router.pathname}
            </p>
            <div className="flex flex-row items-center  justify-between sm:justify-start border-solid border-2 border-slate-300 sm:flex-col">
                <Link href="/account"
                    className="px-4 sm:px-16 py-4 text-sm font-medium text-gray-800 transition duration-150 ease-in-out hover:text-gray-900 hover:bg-slate-100 w-full text-center bg-slate-200"
                >
                    Account
                </Link>
                <Link href="/account/addresses"
                    className="px-4 sm:px-16 py-4 text-sm font-medium text-gray-800 transition duration-150 ease-in-out hover:text-gray-900 hover:bg-slate-100 w-full text-center"
                >
                    Addresses
                </Link>
                <Link href="/account/orders"
                    className="px-4 sm:px-16 py-4 text-sm font-medium text-gray-800 transition duration-150 ease-in-out hover:text-gray-900 hover:bg-slate-100 w-full text-center"
                >
                    Orders
                </Link>


            </div>
            <div className="flex flex-col items-start justify-start w-4/6 py-7 sm:mx-1 mx-16">
                {children}
            </div>
        </div>

    )
}
