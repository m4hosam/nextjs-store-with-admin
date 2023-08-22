import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import CredentialsProvider from 'next-auth/providers/credentials'
import { autherize, getUser } from '@/lib/actions'
import { loginSchema } from '@/common.types'


// import { createUser, getUser } from "./actions";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "email",
                    placeholder: "Enter Your Email"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Enter Your Password"
                }

            },
            async authorize(credentials) {
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                const user = await autherize(credentials?.email as string, credentials?.password as string)
                console.log("user in autherize session: ", user)
                if (!user) {
                    return null
                } else {
                    return user
                }

            }
        })
    ],
    // jwt: {
    //     encode: ({ secret, token }) => {

    //     },
    //     decode: async ({ secret, token }) => {
    //     },
    // },
    secret: process.env.NEXTAUTH_SECRET!,
    pages: {
        signIn: '/account/login',
        signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/account/register' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    theme: {
        colorScheme: "light",
        logo: "/next.svg",
    },
    callbacks: {
        async session({ session }) {
            // const email = session?.user?.email as string;


            // try {
            //     const data = await getUser(email) as { user?: UserProfile }
            // Here i changed the name of the user to the id of the user
            // const newSession = {
            //     ...session,
            //     user: {
            //         ...session.user,
            //         name: "525689",
            //     },
            // };

            // return newSession;
            // } catch (error: any) {
            //     console.error("Error retrieving user data: ", error.message);
            //     return session;
            // }
            return session;
        },
        async signIn({ user }: {
            user: AdapterUser | User
        }) {
            try {
                // console.log("User signin: ", user)
                // const userExists = await getUser(user?.email as string)
                // console.log("userExists session: ", userExists)

                // if (!userExists) {
                //     return false
                // }

                return true;
            } catch (error: any) {
                console.log("Error checking if user exists: ", error.message);
                return false;
            }
        },
    },
};

// export async function getCurrentUser() {
//     const session = await getServerSession(authOptions) as SessionInterface;

//     return session;
// }