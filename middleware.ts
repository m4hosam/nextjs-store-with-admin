import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    // Get a cookie
    let cookie = await request.cookies.get('cart')?.value
    // console.log("Cookie in Middleware1", cookie)

    // To change a cookie, first create a response
    const response = NextResponse.next()

    if (cookie) {
        // Set a cookie
        response.cookies.set('cart', cookie)
    }

    // // Setting a cookie with additional options
    // response.cookies.set({
    //     name: 'cart',
    //     value: 'some-value',
    //     httpOnly: true,
    // })


    // Delete a cookie
    // response.cookies.delete('myCookieName')

    return response
}
// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/:path*',
        // '/cart',
        // '/api/cart/get',
        // '/api/cart/getall'
    ],
}