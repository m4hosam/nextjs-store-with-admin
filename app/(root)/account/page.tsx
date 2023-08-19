
import React, { useState, useEffect, use } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { getCartItems } from "@/lib/actions";
import { CartSchema } from "@/common.types";
import { useShoppingCart } from "@/context/ShoppingCartContext"
import AuthProviders from '@/components/AuthProviders'
import { signIn, signOut, useSession } from 'next-auth/react'

import { ProfileAvatar } from '@/components/profileAvatar'
// import { getCurrentUser } from "@/lib/session";
import { getCsrfToken } from "next-auth/react"
import { useRouter } from "next/navigation";
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { Input } from "@/components/ui/input";
import { InputForm } from "@/components/profileForm";



export default async function Account() {


    return (
        <div className="flex flex-col justify-between w-full sm:flex-row  sm:m-20">
            <div className="flex flex-row items-center  justify-between sm:justify-start border-solid border-2 border-slate-300 sm:flex-col">
                <Link href="/account"
                    className="px-4 sm:px-16 py-4 text-sm font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 hover:bg-slate-200 w-full text-center bg-slate-200"
                >
                    Account
                </Link>
                <Link href="/account"
                    className="px-4 sm:px-16 py-4 text-sm font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 hover:bg-slate-200 w-full text-center"
                >
                    Addresses
                </Link>
                <Link href="/account"
                    className="px-4 sm:px-16 py-4 text-sm font-medium text-gray-500 transition duration-150 ease-in-out hover:text-gray-900 hover:bg-slate-200 w-full text-center"
                >
                    Orders
                </Link>


            </div>
            <div className="flex flex-col items-start justify-start w-4/6 py-7 sm:mx-1 mx-16">
                <InputForm />
            </div>
        </div>
    )
}
