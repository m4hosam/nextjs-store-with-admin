import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import CredentialsProvider from 'next-auth/providers/credentials'


// import { createUser, getUser } from "./actions";
import { SessionInterface } from "@/common.types";

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
                const user = { id: "42", email: "mohamedhosaam154@gmail.com", password: "nextauth" }

                if (credentials?.email === user.email && credentials?.password === user.password) {
                    return user
                } else {
                    return null
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
    theme: {
        colorScheme: "light",
        logo: "/next.svg",
    },
    callbacks: {
        async session({ session }) {
            // const email = session?.user?.email as string;

            // try {
            //     const data = await getUser(email) as { user?: UserProfile }

            //     const newSession = {
            //         ...session,
            //         user: {
            //             ...session.user,
            //             ...data?.user,
            //         },
            //     };

            //     return newSession;
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
                console.log("User: ", user)
                // const userExists = await getUser(user?.email as string) as { user?: UserProfile }

                // if (!userExists.user) {
                //     await createUser(user.name as string, user.email as string, user.image as string)
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