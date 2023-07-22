"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import FormField from "@/components/ui/FormField"
import Image from "next/image"


export default function AddProduct() {
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => { }

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.includes('image')) {
            return alert('Please upload an image');
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            handelStateChange('image', result)
        };
    }


    const handelStateChange = (state: string, value: string) => {

        setform({
            ...form,
            [state]: value
        })
    }


    const [form, setform] = useState({
        image: '',
        productName: '',
        productDescription: '',
        price: '',
    })

    return (
        <form
            onSubmit={handleFormSubmit}
            className="w-full flex justify-around lg:px-32 md:px-14 px-5 py-7 gap-7 flex-wrap"
        >
            <div className="flexStart w-full lg:min-h-[200px] min-h-[200px] relative">
                <label htmlFor="poster" className="flexCenter z-10 text-center w-full h-full p-20 text-gray-500 border-2 border-gray-200 border-dashed">
                    {!form.image && 'Choose a Product Image'}
                </label>
                <input
                    id="image"
                    type="file"
                    accept='image/*'
                    className="absolute z-30 w-full opacity-0 h-full cursor-pointer"
                    onChange={(e) => handleChangeImage(e)}
                />
                {form.image && (
                    <Image
                        src={form?.image}
                        className="sm:p-10 object-contain z-20" alt="image"
                        fill
                    />
                )}
            </div>




            <FormField
                title="Product Name"
                state={form.productName}
                type="text"
                placeholder="Product Name"
                setState={(value) => { handelStateChange('productName', value) }}

            />
            <FormField
                title="Product Description"
                state={form.productDescription}
                type="text"
                placeholder="Product Description"
                setState={(value) => { handelStateChange('productDescription', value) }}

            />
            <FormField
                title="Price"
                type="number"
                state={form.price}
                placeholder="Price"
                setState={(value) => { handelStateChange('price', value) }}

            />



            <Button >Add Product</Button>


            {/* <div className="flex items-center justify-center w-72">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 container overflow-hidden">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        {form.image && (
                            <Image
                                src={form?.image}
                                className="object-contain h-8"
                                alt="Product Image"
                                fill
                            />
                        )}
                    </div>
                    <input
                        id="dropzone-file"
                        onChange={handleChangeImage}
                        accept="image/*"
                        type="file"
                        className="hidden" />
                </label>
            </div> */}

        </form>
    )
}
