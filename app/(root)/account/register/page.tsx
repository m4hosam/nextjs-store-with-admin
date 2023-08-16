
import React, { useState, useEffect, use } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";
import { getCartItems } from "@/lib/actions";
import { CartSchema } from "@/common.types";
import { useShoppingCart } from "@/context/ShoppingCartContext"
import AuthProviders from '@/components/AuthProviders'


import { ProfileAvatar } from '@/components/profileAvatar'
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { RegisterForm } from '@/components/registerForm'

export default async function Register() {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect('/')
    }

    return (
        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create new account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {/* form */}
                <RegisterForm />

            </div>
        </div>
    )
}
