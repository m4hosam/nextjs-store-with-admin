import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { CheckoutForm } from "@/components/forms/checkoutForm";
import { ProfileForm } from "@/components/forms/profileForm";
import { getAddress, getCartItems } from "@/lib/actions";
import { ProductCard } from "@/components/cards/productOrders"
import { Separator } from "@/components/ui/separator";



export default async function Checkout() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect('/account/login')
    }
    const name = session.user?.name || ""
    const email = session.user?.email || ""
    // console.log("session-----address-----", session)
    const UserAddress = await getAddress(email)
    // console.log("UserAddress-------------------------------------", UserAddress)
    if (!UserAddress) {
        redirect('/notfound')
    }


    return (
        <div className="flex flex-1 w-full flex-col justify-center items-center px-6 py-12 lg:px-8">

            <h1 className="text-center  text-slate-900 text-3xl font-medium mb-10">Checkout</h1>
            <div className="flex flex-col lg:flex-row-reverse justify-between w-full items-stretch border border-slate-300 rounded-md">


                <CheckoutForm
                    name={name}
                    address={UserAddress.address}
                    city={UserAddress.city}
                    state={UserAddress.state}
                    postal={UserAddress.postal}
                    phone={UserAddress.phone}
                    email={email}
                />


            </div>
        </div>

    )

}