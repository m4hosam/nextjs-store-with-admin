import React from "react";
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth/next"
import { ProfileLinks } from "@/components/ui/profileLinks";
import { ProfileForm } from "@/components/forms/profileForm";
import { redirect } from "next/navigation"



export default async function Account() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/')
    }

    console.log("session", session)
    const name = session.user?.name
    const email = session.user?.email
    const image = session.user?.image
    return (

        <div className="flex flex-col justify-around w-full sm:flex-row  sm:my-32">
            <ProfileLinks active="account" />
            <div className="flex flex-col items-start justify-start w-3/5 sm:mx-1 mx-16">
                <ProfileForm name={name} email={email} image={image} />
            </div>
        </div>

    )
}
