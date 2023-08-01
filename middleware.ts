import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const response = NextResponse.next()
    // Get a cookie
    const cookie = request.cookies.get('myCookieName')?.valueOf()

    // console.log("cookie", cookie)

    response.cookies?.set('auth2', 'true')



    // Get all cookies
    const all_cookies = request.cookies.getAll()
    // console.log("all Cookies", all_cookies)

    // // To change a cookie, first create a response
    // const response = NextResponse.next()

    // // Set a cookie
    // response.cookies.set('myCookieName', 'some-value')

    // // Setting a cookie with additional options
    // response.cookies.set({
    //     name: 'myCookieName',
    //     value: 'some-value',
    //     httpOnly: true,
    // })

    // Delete a cookie
    request.cookies.delete('myCookieName')
    // console.log("does exists", request.cookies.has('myCookieName'))

    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/',
}