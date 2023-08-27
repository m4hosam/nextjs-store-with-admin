
import prisma from '@/lib/prismadb';
import { cookies } from 'next/headers'
import { decode } from 'next-auth/jwt';

// Not Used
export async function GET() {
    const cookieList = cookies();
    const cartCookieAuth = cookieList.get('next-auth.session-token')?.value;
    const cartCookieCsrf = cookieList.get('next-auth.csrf-token');
    console.log('cartCookieAuth', cartCookieAuth);
    console.log('cartCookieCsrf', cartCookieCsrf);
    const decoded = await decode({
        token: cartCookieAuth,
        secret: process.env.NEXTAUTH_SECRET as string,
    });
    console.log('decoded', decoded);

    try {
        // Create a new row in the Products table using Prisma
        const user = await prisma.user.findUnique({
            where: {
                email: decoded?.email as string,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
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
