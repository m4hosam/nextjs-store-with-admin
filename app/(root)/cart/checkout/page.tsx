import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"

export default async function Checkout() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect('/api/auth/signin?callbackUrl=/server')
    }

    return (
        <section className="flex flex-col gap-6">

            <p>{session?.user?.name}</p>
            <p>{session?.user?.email}</p>
            <p>{session?.user?.image}</p>
        </section>
    )

}