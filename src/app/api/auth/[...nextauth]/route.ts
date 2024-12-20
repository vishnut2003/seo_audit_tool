import { verifyIsAdmin } from "@/utils/server/authUtils";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
            authorize(credentials, req) {
                verifyIsAdmin({
                    email: credentials?.email,
                    password: credentials?.password
                })
                return null;
            },
        })
    ],
    secret: process.env.NEXTAUTH_JWT_SECRET,
    pages: {
        signIn: '/'
    },
})

export { handler as GET, handler as POST };