// Without a defined matcher, this one line applies next-auth 
// to the entire project
export { default } from "next-auth/middleware"


// Applies next-auth only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: [
        "/cart/checkout",
        "/account",
        "/account/orders",
        "/account/addresses",
        // "/api/auth/signin",
        // "/api/auth/signout",
        // "/api/auth/session",
        // "/api/auth/csrf",

    ]
}