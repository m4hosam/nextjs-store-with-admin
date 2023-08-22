import prisma from '@/lib/prismadb';
import { AddressSchema } from '@/common.types';


// {
//     "address": "Subk elahad ashmoun",
//     "city": "Menofia",
//     "state": "ashmoun",
//     "postal": "55555",
//     "phone": "111111111",
//     "email": "smilemohamed5@gmail.com"
// }


async function readUserId(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                id: true,
            },
        });
        return user?.id || '';;
    } catch (error) {
        return "";
    }
}



export async function POST(request: Request) {
    const { address, city, state, postal, phone, email }: AddressSchema = await request.json();
    console.log("-------- Post /address ---------")
    console.log("address: ", address)
    console.log("city: ", city)
    console.log("state: ", state)
    console.log("postal: ", postal)
    console.log("email: ", email)

    try {
        const user_id: string = await readUserId(email);
        console.log("user_id: ", user_id)

        if (!user_id) {
            return new Response(JSON.stringify(false), { status: 404 });
        }

        const existingAddress = await prisma.addresses.findFirst({
            where: {
                user_id: user_id,
            },
        });
        console.log("existingAddress: ", existingAddress)
        if (existingAddress) {
            // Address already exists, update it
            const addressUpdated = await prisma.addresses.update({
                where: {
                    id: existingAddress.id,
                },
                data: {
                    address: address,
                    city: city,
                    state: state,
                    postal: postal,
                    phone: phone,
                },
            });
            console.log("addressUpdated: ", addressUpdated)
        } else {
            // Address doesn't exist, create it
            const addressCreated = await prisma.addresses.create({
                data: {
                    address: address,
                    city: city,
                    state: state,
                    postal: postal,
                    phone: phone,
                    user: {
                        connect: {
                            id: user_id,
                        },
                    },
                },
            });
            console.log("addressCreated: ", addressCreated)
        }

        // Return the user in the response
        return new Response(JSON.stringify(true), { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return new Response(JSON.stringify(false), { status: 500 });
    }

}
