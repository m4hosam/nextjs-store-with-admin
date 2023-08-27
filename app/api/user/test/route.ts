import { cookies } from 'next/headers'
import { getToken } from "next-auth/jwt"
import { decode } from 'next-auth/jwt';


export async function GET(request: Request) {
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

    return new Response(JSON.stringify({ decoded }), { status: 200 });


}
