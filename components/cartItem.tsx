"use client"
import { addToCart } from '@/lib/actions'
import { CartProps } from "@/common.types"
import { useState } from 'react'
import Image from "next/image"
import { handleCartUpdate } from '@/utils/cartUtils';
import { useShoppingCart } from "@/context/ShoppingCartContext"

export const CartItem = ({ product_id, name, brand, image, price, category, quantity }: CartProps) => {
  const [cartQuantity, setCartQuantity] = useState<number>(quantity);
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()

  const [isLoading, setisLoading] = useState(false)

  async function handledecreaseCartQuantity(id: string) {
    const newQuantity = cartQuantity - 1;
    setisLoading(true)

    await addToCart(id, newQuantity);
    setCartQuantity(newQuantity);
    console.log("decreaseCartQuantity: ", id);

    decreaseCartQuantity(id);

    setisLoading(false)

  }

  async function handleincreaseCartQuantity(id: string) {
    const newQuantity = cartQuantity + 1;
    setisLoading(true)

    await addToCart(id, newQuantity);
    setCartQuantity(newQuantity);
    console.log("increaseCartQuantity: ", id);
    increaseCartQuantity(id);

    setisLoading(false)
  }

  async function handleremoveFromCart(id: string) {
    setisLoading(true)

    await addToCart(id, 0);
    setCartQuantity(0);
    console.log("removeFromCart: ", id);
    removeFromCart(id);

    setisLoading(false)
  }

  return (
    <>
      {cartQuantity > 0 && (
        <div className="justify-between mb-6 h-full rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <div className="flex flex-row items-center justify-center w-full h-56 sm:h-32 rounded-lg sm:w-44">
            <Image
              src={image}
              alt="product-image"
              className="w-auto h-auto rounded-lg sm:max-w-32 sm:max-h-32 object-contain"
              width={160}
              height={120}
            />
          </div>
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0 flex flex-col justify-between">
              <div>
                <p className="mt-1 text-xs text-gray-700">{brand}</p>
                <h2 className="text-lg font-bold text-gray-900">{name}</h2>
              </div>
            </div>
            <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100 ">
                <button
                  onClick={() => handledecreaseCartQuantity(product_id)}
                  className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                >
                  -
                </button>
                <div className="flex flex-ro items-center justify-center h-8 w-8 border bg-white text-center text-xs outline-none">
                  {
                    isLoading ? (

                      <svg aria-hidden="true" role="status" className="w-4 h-4  text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                      </svg>
                    )
                      :
                      (
                        cartQuantity
                      )
                  }
                </div>
                <button
                  onClick={() => handleincreaseCartQuantity(product_id)}
                  className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                >
                  +
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm">{price} EGP</p>
                <button onClick={() => handleremoveFromCart(product_id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
