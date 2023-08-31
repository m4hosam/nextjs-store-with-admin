import prisma from '@/lib/prismadb';
import fs from 'fs';
import path from 'path';
import dataUriToBuffer from 'data-uri-to-buffer';
import { ProductPropsAdmin } from '@/common.types';


export async function GET(request: Request, { params }: { params: { id: string } }) {

    try {
        // Create a new row in the Products table using Prisma
        const product = await prisma.products.findFirst({
            where: {
                id: params.id
            }
        });

        // Return the products in the response
        return new Response(JSON.stringify(product), { status: 200 });
    } catch (error) {
        console.error('Error fetching products with id:', error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }

}


export async function DELETE(request: Request, { params }: { params: { id: string } }) {

    try {
        // Create a new row in the Products table using Prisma
        const deletedProduct = await prisma.products.delete({
            where: {
                id: params.id
            }
        });

        // Return the products in the response
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error deleting product with id:', error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }

}


export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const { productName, brand, category, stock_price, image, price }: ProductPropsAdmin = await request.json();

    // The name of the image shouldn't contain % sign

    // Convert the Data URL to a buffer
    const imageBuffer = dataUriToBuffer(image);

    // Generate a unique file name (you can use a library like uuid for this)
    const fileName = `${productName.split(' ').join('')}-${Date.now()}.png`; // Assuming the image is in PNG format, you may need to adjust the extension accordingly.

    // Define the file path where the image will be saved
    const filePath = path.join(process.cwd(), 'public', 'assets', fileName);

    // Save the image to the file system
    fs.writeFileSync(filePath, imageBuffer);



    try {
        // Create a new row in the Products table using Prisma
        const updatedProduct = await prisma.products.update({
            where: {
                id: params.id
            },
            data: {
                name: productName,
                brand: brand,
                category: category,
                stock_price: parseFloat(stock_price),
                price: parseFloat(price),
                image: '/assets/' + fileName, // Assuming fileName is the name of the saved image file
            },
        });

        // Return the products in the response
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error fetching product with id:', error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }

}

