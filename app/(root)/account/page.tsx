

import React from "react";



export default async function Account() {


    return (

        <div className="flex flex-col justify-around w-full sm:flex-row  sm:my-32">
            <ProfileLinks active="account" />
            <div className="flex flex-col items-start justify-start w-3/5 sm:mx-1 mx-16">
                <ProfileForm />
            </div>
        </div>

    )
}
