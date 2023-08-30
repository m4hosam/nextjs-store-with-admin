import { decode } from 'next-auth/jwt';


export async function decodeAuthCookie(cookie: string) {
    try {
        // console.log('cookie', cookie);
        if (cookie === undefined) return false;

        const decodedUser = await decode({
            token: cookie,
            secret: process.env.NEXTAUTH_SECRET as string,
        });
        console.log(decodedUser)
        if (!decodedUser) {
            return false;
        }
        return decodedUser?.email as string;
    } catch (error) {

        // console.log('decoded', decodedUser);
        return false;
    }
}