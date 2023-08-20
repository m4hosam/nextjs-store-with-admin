"use client"
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
import { register } from "@/lib/actions";


interface CredentialsFormProps {
    csrfToken?: string
}


export function RegisterForm(props: CredentialsFormProps) {
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const email = data?.get("email") as string
        const name = data?.get("name") as string
        const password = data?.get("password") as string
        const password_confirm = data.get("password_confirm")
        if (password !== password_confirm) {
            setError("Passwords do not match!")
            return
        }

        const registerStatus = await register(
            email,
            password,
            name,
        );
        console.log("registerStatus", registerStatus)

        if (registerStatus === 200) {
            // Authentication success
            router.push("/")
        }
        else if (registerStatus === 409) {
            setError("User Already Exists. Login in instead.")
        }
        else {
            // 401 not autherized
            setError("Error in Registering User")
        }
        // if (signInResponse && !signInResponse.error) {
        //     // Authentication success
        //     router.push("/")
        // }
        // else {
        //     console.log("Error", signInResponse)
        //     setError("Your Email or Password is wrong!")
        // }
    }

    return (

        <form onSubmit={handleSubmit} className="space-y-6" >
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">

                    <span className="block sm:inline">{error}</span>
                    {/* <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                    </span> */}
                </div>
            )}
            <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                    Name
                </label>
                <div className="mt-2">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="text"
                        required
                        className="block w-full rounded-md px-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md px-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>


                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                </label>

                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md px-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>

                <label htmlFor="password_confirm" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                </label>

                <div className="mt-2">
                    <input
                        id="password_confirm"
                        name="password_confirm"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md px-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Register
                </button>
            </div>
        </form>

    )
}
