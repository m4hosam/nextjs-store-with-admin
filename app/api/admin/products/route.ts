import fs from 'fs';
import path from 'path';
import dataUriToBuffer from 'data-uri-to-buffer';
import prisma from '@/lib/prismadb';
import { ProductPropsAdmin } from '@/common.types';


export async function GET() {

    try {
        // Fetch all products from the database using Prisma
        const allProducts = await prisma.products.findMany();

        // Return the products in the response
        return new Response(JSON.stringify(allProducts), { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }

}


export async function POST(request: Request) {
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
        const newProduct = await prisma.products.create({
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
        console.error('Error fetching products:', error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }

}
