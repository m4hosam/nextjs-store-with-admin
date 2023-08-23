
import { CartProps } from "@/common.types"
import Image from "next/image"
import { Separator } from "@/components/ui/separator";

export const ProductCard = ({ name, brand, image, price, category, quantity }: CartProps) => {

    return (
        <div>
            <div className=" mb-6 rounded-lg  p-6  flex justify-start">
                <Image
                    src={image}
                    alt="product-image"
                    className="w-24 rounded-lg sm:w-28"
                    width={160}
                    height={120}
                />
                <div className="ml-4 flex w-full justify-between">
                    <div className="mt-0 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{name}</h2>
                            <p className="mt-1 text-base font-medium text-slate-600">{brand}</p>
                            <p className="mt-3 text-base font-medium text-slate-500">quantity: {quantity}</p>
                        </div>
                    </div>
                    <div className=" justify-between im space-y-6 mt-0 block space-x-6">

                        <div className="flex items-center space-x-4">
                            <p className="text-lg font-bold">{price} LE</p>
                        </div>
                    </div>
                </div>
            </div>
            <Separator className="my-4" />
        </div>
    );
}
