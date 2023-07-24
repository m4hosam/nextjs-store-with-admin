import fs from 'fs';
import path from 'path';
import dataUriToBuffer from 'data-uri-to-buffer';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// export const POST = async (req: any, res: any) => {
//     const { image, productName, productDescription, price } = await req.body;
//     console.log(productName);
//     return new Response(JSON.stringify({ message: "Product added successfully" }), { status: 200 });

// }



export async function POST(request: Request) {
    const { image, productName, productDescription, price } = await request.json();

    // Convert the Data URL to a buffer
    const imageBuffer = dataUriToBuffer(image);

    // Generate a unique file name (you can use a library like uuid for this)
    const fileName = `${productName}-${Date.now()}.png`; // Assuming the image is in PNG format, you may need to adjust the extension accordingly.

    // Define the file path where the image will be saved
    const filePath = path.join(process.cwd(), 'public', 'assets', fileName);

    // Save the image to the file system
    fs.writeFileSync(filePath, imageBuffer);

    // Create a new row in the Products table using Prisma
    const newProduct = await prisma.products.create({
        data: {
            name: productName,
            description: productDescription,
            price: price,
            image: '/assets/' + fileName, // Assuming fileName is the name of the saved image file
        },
    });

    console.log(newProduct)

    return new Response(JSON.stringify(productName), { status: 200 });

}
