
import prisma from '@/lib/prismadb';
import { loginSchema } from '@/common.types';


// {
//     "name": "Mohamed",
//     "email": "mohamedhosaam2154@gmail.com",
//     "password": "notsecure",
//     "cookie_id": ""
// }


export async function POST(request: Request) {
    const { email }: { email: string } = await request.json();

    try {
        // Create a new row in the Products table using Prisma
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                email: true,
                name: true,
            }
        });
        // console.log("user: ", user)
        if (!user) {
            return new Response(JSON.stringify(false), { status: 200 });
        }
        else {

            return new Response(JSON.stringify(true), { status: 200 });
        }

        // Return the user in the response
    } catch (error) {
        console.error('Error fetching user:', error);
        return new Response(JSON.stringify(false), { status: 500 });
    }

}
