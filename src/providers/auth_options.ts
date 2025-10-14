import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const GITHUB_ID = process.env.GITHUB_ID!;
const GITHUB_SECRET = process.env.GITHUB_SECRET!;
// const BACKEND_API_URL = process.env.BACKEND_API_URL!;

export const authOptions : NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: GITHUB_ID,
            clientSecret: GITHUB_SECRET,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user, account }) {
            console.log({token, user, account}, 'jwt');
            if (user) {
                token.user = user;
                // token.role 
            }
            return token;
        },
        async session({session, token}) {
            console.log({session, token}, 'session');
            return session;
        },
    },
    events: {
        signIn: async ({user, account, profile, isNewUser}) => {
            // asffasf...
            console.log({user, account, profile, isNewUser}, 'event');
        }
    },
    pages: {
        signIn: "/auth/signin",
    },
    debug: process.env.NODE_ENV === 'development'
}