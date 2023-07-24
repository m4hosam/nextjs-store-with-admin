
// export async function GET(request: Request) {


//     return new Response(JSON.stringify(id), { status: 200 });
// }


export async function GET(request: Request, { params }: { params: { id: string } }) {

    return new Response(JSON.stringify(params.id), { status: 200 });

}