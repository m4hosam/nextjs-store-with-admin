
import { CartProps } from "@/common.types"
import Image from "next/image"
import { Separator } from "@/components/ui/separator";

export const ProductCard = ({ name, brand, image, price, category, quantity }: CartProps) => {

    return (
        <div>
            <div className="flex justify-center items-center mb-6 rounded-lg p-1 md:p-6 flex-col md:flex-row">
                <div className="flex flex-row items-center justify-center w-full h-56 sm:h-32 rounded-lg sm:w-44">

                    <Image
                        src={image}
                        alt="product-image"
                        className="w-auto h-auto rounded-lg sm:max-w-32 sm:max-h-32 object-scale-down"
                        width={160}
                        height={120}
                    />
                </div>
                <div className="ml-4 flex flex-col md:flex-row w-full justify-between">
                    <div className="mt-0 flex flex-col justify-between">
                        <div>
                            <h2 className="text-base font-bold text-gray-900">{name}</h2>
                            <p className="mt-1 text-sm font-medium text-slate-600">{brand}</p>
                        </div>
                        <p className="mt-3 text-base font-medium text-emerald-600">{quantity} Items</p>
                    </div>
                    <div className=" justify-between im space-y-6 mt-0 block space-x-6">

                        <div className="flex items-center space-x-4">
                            <p className="text-lg font-bold w-20 text-left text-sky-700">{price} LE</p>
                        </div>
                    </div>
                </div>
            </div>
            <Separator className="mt-4" />
        </div>
    );
}
