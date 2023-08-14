
import React, { useState, useEffect, use } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { getCartItems } from "@/lib/actions";
import { CartSchema } from "@/common.types";
import { useShoppingCart } from "@/context/ShoppingCartContext"
import AuthProviders from '@/components/AuthProviders'
import { signIn, signOut, useSession } from 'next-auth/react'
import { SessionInterface } from "@/common.types";
import { ProfileAvatar } from '@/components/profileAvatar'
// import { getCurrentUser } from "@/lib/session";
import { getCsrfToken } from "next-auth/react"
import { useRouter } from "next/navigation";
import { CredentialsForm } from '@/components/credentialsForm'
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"



export default async function Login() {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect('/')
    }

    return (
        <div

            className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8"
        >

            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                <CredentialsForm />
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Link href="/account/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign UP
                    </Link>
                </p>
            </div>
        </div>
    )
}
