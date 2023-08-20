
import React from "react";

import { ProfileLinks } from "@/components/ui/profileLinks";



export default async function Account() {


    return (
        <div className="flex flex-col justify-around  w-full sm:flex-row  sm:my-32">
            <ProfileLinks active="order" />
            <div className="flex flex-col items-start justify-start w-3/5  sm:mx-1 mx-16">
                <h2>No orders</h2>
            </div>
        </div>
    )
}
