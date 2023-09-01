"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"
import FormField from "@/components/ui/formField"
import Image from "next/image"
import { ProductPropsAdmin } from '@/common.types';
import { categoryFilters } from '@/constant';
import CustomMenu from '@/components/ui/customMenu';
import { createProduct } from '@/lib/actionAdmin'
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AddProduct() {
    const router = useRouter();
    // State variable to track the visibility of the alert
    const [form, setform] = useState<ProductPropsAdmin>({
        productName: '',
        category: '',
        price: '',
        image: '',
        stock_price: '',
        brand: '',
    })

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Send form object to backend
        try {
            // Send form object to backend using fetch
            const response = await createProduct(form)


            if (response.success) {
                // toggle the alert to flex
                toast.success('Product successfully added!')
            }
            else {
                // toggle the alert to hidden
                toast.error('An Error Occured')
            }
            router.refresh();

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
            handleStateChange('image', result)
        };
    }


    const handleStateChange = (state: string, value: string) => {

        setform({
            ...form,
            [state]: value
        })
    }




    return (
        <form
            onSubmit={handleFormSubmit}
            className="w-full flex justify-around lg:px-32 md:px-14 px-5 py-7 gap-7 flex-wrap"
        >
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />

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
                title="Brand Name"
                type="text"
                state={form.brand}
                placeholder="Brand Name"
                setState={(value) => { handleStateChange('brand', value) }}

            />
            <FormField
                title="Product Name"
                state={form.productName}
                type="text"
                placeholder="Product Name"
                setState={(value) => { handleStateChange('productName', value) }}

            />
            {/* Add category menu */}
            <CustomMenu
                title="Category"
                state={form.category}
                filters={categoryFilters}
                setState={(value) => handleStateChange('category', value)}
            />


            <FormField
                title="Price"
                type="number"
                state={form.price}
                placeholder="Price"
                setState={(value) => { handleStateChange('price', value) }}

            />
            <FormField
                title="Stock Price"
                type="number"
                state={form.stock_price}
                placeholder="Stock Price"
                setState={(value) => { handleStateChange('stock_price', value) }}

            />
            <Button >Add Product</Button>

        </form>
    )
}
