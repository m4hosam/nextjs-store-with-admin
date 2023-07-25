"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import FormField from "@/components/ui/FormField"
import Image from "next/image"


export default function AddProduct() {
    // State variable to track the visibility of the alert
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const handleAlertClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Hide the alert
        setIsAlertVisible(false);
    }


    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Send form object to backend
        try {
            // Send form object to backend using fetch
            const response = await fetch('/api/products/create', {
                method: 'POST',
                body: JSON.stringify(form),

            });

            if (!response.ok) {
                // Handle any error scenarios if needed
                console.error('Form submission failed.');
                return;
            }

            // Form submission successful, do something with the response if needed
            const data = await response.json();
            if (data.success) {
                // toggle the alert to flex
                setIsAlertVisible(true);
            }
            else {
                // toggle the alert to hidden
                setIsAlertVisible(false);
            }

        } catch (error) {
            // Handle any network or other errors
            console.error('Error occurred while submitting the form:', error);
        }
    }

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
            {/* <button id="triggerElement" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Hide alert</button>

            <div id="targetElement" className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-blue-200 dark:text-blue-800" role="alert">
                <span className="font-medium">Info alert!</span> Change a few things up and try submitting again.
            </div> */}
            <div id="alert-3"
                className={`flex items-center p-4 mb-4 text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 ${isAlertVisible ? 'flex' : 'hidden'
                    }`}
                role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div className="ml-3 text-sm font-medium">
                    Product has been added to the Database Successfully <a href="#" className="font-semibold underline hover:no-underline">See the product</a>.
                </div>
                <button onClick={handleAlertClose} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-green-50 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-3" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                </button>
            </div>
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