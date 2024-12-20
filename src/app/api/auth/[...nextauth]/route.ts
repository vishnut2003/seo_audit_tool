import { fetchMainAdmin, verifyIsMainAdmin } from "@/utils/server/authUtils";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {Profile, Account} from "next-auth"

const handler = NextAuth({
    providers: [
        Credentials({
            id: "Credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials, req) {
                try {

                    // Check if the user is login using main-admin details
                    const isAdmin = verifyIsMainAdmin({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                    
                    if (isAdmin && credentials?.email) {
                        const mainAdminInfo = await fetchMainAdmin({email: credentials.email});
                        return mainAdminInfo as any
                    }

                    return null

                } catch (err) {
                    console.log(err);
                    return null
                }
            },
        })
    ],
    secret: process.env.NEXTAUTH_JWT_SECRET,
    pages: {
        signIn: '/'
    },
})

export { handler as GET, handler as POST };