
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



export default async function Account() {
    const session = await getServerSession(authOptions)

    if (session) {
        redirect('/')
    }

    return (
        <div

            className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8"
        >

            <p>Account Details</p>
        </div>
    )
}
