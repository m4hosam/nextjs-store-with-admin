
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
import { AddressForm } from "@/components/forms/addressForm";
import { ProfileLinks } from "@/components/ui/profileLinks";



export default async function Account() {


    return (
        <div className="flex flex-col justify-between w-full sm:flex-row  sm:m-20">
            <ProfileLinks active="address" />
            <div className="flex flex-col items-start justify-start w-4/6 py-7 sm:mx-1 mx-16">
                <AddressForm />
            </div>
        </div>
    )
}
