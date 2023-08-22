
import prisma from '@/lib/prismadb';
import { AddressSchema } from '@/common.types';




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
        console.log("user.id: ", user_id)

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
        }

        // const addressCreated = await prisma.addresses.upsert({
        //     where: {
        //         user: { id: user_id }, // Using the relation field
        //     },
        //     update: {
        //         address: address,
        //         city: city,
        //         state: state,
        //         postal: postal,
        //         phone: phone,
        //     },
        //     create: {
        //         address: address,
        //         city: city,
        //         state: state,
        //         postal: postal,
        //         phone: phone,
        //         user: { connect: { id: user_id } },
        //     },
        // });


        // Return the user in the response
        return new Response(JSON.stringify({ success: "Post" }), { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return new Response(JSON.stringify({ success: false, error: error }), { status: 500 });
    }

}


export async function GET(request: Request) {

    return new Response(JSON.stringify({ success: "Get" }), { status: 200 });


}
