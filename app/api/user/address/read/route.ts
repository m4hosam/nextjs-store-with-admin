import prisma from '@/lib/prismadb';

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
    console.log("-------- Get /address ---------")
    console.log("request: ", request)
    const { email }: { email: string } = await request.json();
    try {
        const user_id = await readUserId(email);
        if (!user_id) {
            return new Response(JSON.stringify(false), { status: 404 });
        }
        const address = await prisma.addresses.findFirst({
            where: {
                user_id: user_id,
            },
        });
        return new Response(JSON.stringify(address), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(false), { status: 500 });
    }


}