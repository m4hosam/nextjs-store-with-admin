import prisma from '@/lib/prismadb';
import { cookies } from 'next/headers';
import { nanoid } from 'nanoid';


type Cookie = {
    name: string
    value: string
}

type Email = {
    email: string;
};


function createNewCookie() {

    let myuuid = nanoid();
    const cookie: Cookie = {
        name: 'cart',
        value: myuuid
    }
    return cookie;


}


function createCookie(value: string) {
    const cookie: Cookie = {
        name: 'cart',
        value: value
    }
    return cookie;
}


// This route is used to link an existing cookie cart to user table.
export async function POST(request: Request) {
    const { email }: Email = await request.json();
    const cookieList = cookies();
    const cartCookie = cookieList.get('cart')?.value;
    if (!email) {
        return new Response(JSON.stringify({ message: "No email" }), { status: 404 });
    }

    try {
        console.log("Email in linktouser", email);
        console.log("Cart cookie in linktouser", cartCookie);
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return new Response(JSON.stringify({ message: "No user" }), { status: 404 });
        }


        if (user.cookie_id === "") {
            // if no cookie_id in user table, ---v 
            // ----- if no cookie in browser -->
            // ----- if cookie in browser --> update user table with cookie id
            console.log("User cookie id is empty");
            if (!cartCookie) {
                // if no cookie in browser --> create cookie in browser and user table
                // const newCookie = createNewCookie();
                // cookieList.set(newCookie)
                // await prisma.user.update({
                //     where: {
                //         email: email,
                //     },
                //     data: {
                //         cookie_id: newCookie.value,
                //     },
                // });
                return new Response(JSON.stringify({}), { status: 200 });
            }
            else {
                await prisma.user.update({
                    where: {
                        email: email,
                    },
                    data: {
                        cookie_id: cartCookie,
                    },
                });
            }
        }
        else {
            // if cookie_id in user table, ---> update browser cookie to the cookie_id in user table
            console.log("User DB cookie_id is ", user?.cookie_id);
            const new_Cookie = createCookie(user?.cookie_id as string);
            cookieList.set(new_Cookie)

        }

        return new Response(JSON.stringify({}), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error catching data in linktouser route" }), { status: 404 });
    }
}