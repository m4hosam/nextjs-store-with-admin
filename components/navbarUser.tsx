"use client"
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


export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session, status } = useSession()
    // status === "loading" ? console.log("loading") :
    // status === "authenticated" ? console.log("authenticated") :
    console.log("session in navbar:", session)
    // const [currentUser, setcurrentUser] = useState<SessionInterface>()
    // useEffect(() => {
    //     const fetchCurrentUser = async () => {
    //         const res = await getCurrentUser();
    //         console.log("res:", res)
    //         setcurrentUser(res);
    //     }

    //     fetchCurrentUser();
    // }, []);


    const { cartQuantity } = useShoppingCart()
    // const [cartItemsCount, setCartItemsCount] = useState(0);

    // useEffect(() => {
    //     // Fetch initial cart items count
    //     handleCartUpdate((count) => setCartItemsCount(count));
    // }, []);

    return (

        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex w-full items-center justify-between">
                        <div className="flex-shrink-0">
                            <img
                                className="h-8 w-8"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                alt="Workflow"
                            />
                        </div>
                        <div className="hidden md:block">
                            <div className="flex items-baseline space-x-4">
                                <Link
                                    href="/"
                                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Home
                                </Link>

                                <Link
                                    href="/products/watches"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Watches
                                </Link>

                                <Link
                                    href="/products/accessories"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Accessories
                                </Link>

                                <Link
                                    href="/products/category"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Category
                                </Link>
                            </div>
                        </div>

                        <div className="flex flex-row-reverse justify-end items-center">

                            {session?.user ? (
                                <>
                                    <ProfileAvatar />
                                </>
                            ) : (
                                <button type="button"
                                    className="py-1.5 px-5 mr-5 text-sm font-medium
                             text-gray-900 focus:outline-none
                              bg-white rounded-full border border-gray-200
                               hover:bg-gray-100 hover:text-blue-700 focus:z-10
                                focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700
                                 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600
                                  dark:hover:text-white dark:hover:bg-gray-700"
                                    onClick={() => signIn()}
                                >
                                    Sign In
                                </button>


                            )}
                            <Link href="/cart" className="flex justify-center items-center mr-7">
                                <div className="relative py-2">
                                    {cartQuantity > 0 && (
                                        <div className="absolute left-3" style={{ top: "0.8rem" }}>
                                            <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">{cartQuantity}</p>
                                        </div>
                                    )}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: mt-4 h-6 w-6 text-cyan-100">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                    </svg>
                                </div>
                            </Link>

                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <Transition
                show={isOpen}
                enter="transition ease-out duration-100 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                {(ref) => (
                    <div className="md:hidden" id="mobile-menu">
                        <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link
                                href="/"
                                className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Home
                            </Link>

                            <Link
                                href="/products/watches"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Watches
                            </Link>

                            <Link
                                href="/products/accessories"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Accessories
                            </Link>

                            <Link
                                href="/products/category"
                                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Category
                            </Link>
                        </div>
                    </div>
                )}
            </Transition>
        </nav>
    )
}
