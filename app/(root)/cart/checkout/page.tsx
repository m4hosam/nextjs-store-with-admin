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
                {/* <div className="w-full p-14 bg-gray-100 md:w-1/2 ">

                    <h1 className=" text-slate-900 text-2xl font-medium mb-5">Order Summary</h1>
                    <ProductCard
                        product_id="1"
                        name="Watch"
                        brand="Rolex"
                        image="/assets/Metalhandwatchhighcopy-1690749112645.png"
                        price="500"
                        category=""
                        quantity={5}
                    />
                    <ProductCard
                        product_id="1"
                        name="Watch"
                        brand="Rolex"
                        image="/assets/Metalhandwatchhighcopy-1690749112645.png"
                        price="500"
                        category=""
                        quantity={5}
                    />
                    <div className="flex flex-row w-full justify-between mb-5">
                        <p className="text-slate-700 text-xl font-medium">SubTotal</p>
                        <p className="text-slate-900 text-xl font-medium">526 LE</p>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                        <p className="text-slate-700 text-xl font-medium">Shipping</p>
                        <p className="text-slate-900 text-xl font-medium">20 LE</p>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex flex-row w-full justify-between">
                        <p className="text-slate-700 text-xl font-medium">Total</p>
                        <p className="text-slate-900 text-xl font-medium">600 LE</p>
                    </div>
                </div> */}


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