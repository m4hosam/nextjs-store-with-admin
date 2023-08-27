
import prisma from '@/lib/prismadb';
import { loginSchema } from '@/common.types';


// {
//     "name": "Mohamed",
//     "email": "mohamedhosaam2154@gmail.com",
//     "password": "notsecure",
//     "cookie_id": ""
// }
type Email = {
    email: string;
}


export async function POST(request: Request) {
    const { email }: Email = await request.json();
    if (!email) {
        return new Response(JSON.stringify(false), { status: 200 });
    }

    try {
        // Create a new row in the Products table using Prisma
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        // console.log("user: ", user)
        if (!user) {
            return new Response(JSON.stringify(false), { status: 200 });
        }
        else {

            return new Response(JSON.stringify(user), { status: 200 });
        }

        // Return the user in the response
    } catch (error) {
        console.error('Error fetching?????????/ user:', error);
        return new Response(JSON.stringify(false), { status: 500 });
    }

}
