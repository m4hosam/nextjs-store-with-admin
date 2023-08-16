
import prisma from '@/lib/prismadb';
import { loginSchema } from '@/common.types';


// {
//     "name": "Mohamed",
//     "email": "mohamedhosaam2154@gmail.com",
//     "password": "notsecure",
//     "cookie_id": ""
// }


export async function POST(request: Request) {
    const { email, password }: loginSchema = await request.json();
    // console.log("email---------->: ", email)


    try {
        // Create a new row in the Products table using Prisma
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        // console.log("user--------: ", user)
        if (!user) {
            return new Response(JSON.stringify(false), { status: 200 });
        }
        else {

            if (user.password === "google_VgW0Cfslpw") {
                return new Response(JSON.stringify({ email: user?.email, name: user?.name }), { status: 200 });
            }
            else if (user.password !== password) {
                return new Response(JSON.stringify(false), { status: 200 });
            }
        }


        // Return the user in the response
        return new Response(JSON.stringify({ email: user?.email, name: user?.name }), { status: 200 });
    } catch (error) {
        console.error('Error fetching---------------> user:', error);
        return new Response(JSON.stringify(false), { status: 500 });
    }

}
