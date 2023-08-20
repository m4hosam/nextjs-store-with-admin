import React from 'react'
import Link from 'next/link'

export function ProfileLinks(props: { active: string }) {
    const isAccount = props.active === 'account';
    const isAddress = props.active === 'address';
    const isOrder = props.active === 'order';

    return (
        <div className="flex flex-row items-center  justify-between sm:justify-start border-solid border-2 border-slate-300 sm:flex-col">
            <Link href="/account"
                className={`px-4 sm:px-16 py-4 text-sm font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 hover:bg-slate-200 w-full text-center ${isAccount ? 'bg-slate-200' : ''}`}
            >
                Account
            </Link>
            <Link href="/account/addresses"
                className={`px-4 sm:px-16 py-4 text-sm font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 hover:bg-slate-200 w-full text-center   ${isAddress ? 'bg-slate-200' : ''}`}
            >
                Addresses
            </Link>
            <Link href="/account/orders"
                className={`px-4 sm:px-16 py-4 text-sm font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 hover:bg-slate-200 w-full text-center   ${isOrder ? 'bg-slate-200' : ''}`}
            >
                Orders
            </Link>


        </div>
    )
}
