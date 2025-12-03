import { getJWTTokenApiUrl, providerAuthUrlApi } from "@/constants/apiEndPoints";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

const GITHUB_ID = process.env.GITHUB_ID!;
const GITHUB_SECRET = process.env.GITHUB_SECRET!;

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      const taken : any = token;
      if (user) {
        taken.user = user;
        const {data} = await axios.post(getJWTTokenApiUrl, {
          email: taken?.user?.email,
          name: taken?.user?.name,
        });
        taken.user.token = data.token;
        // token.role
      }
      if (account) {
        taken.user.provider = account.provider;
        taken.user.provider_account_id = account.providerAccountId;
      }
      return taken;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  events: {
    signIn: async ({ user, account } : {account: any, user : any}) => {
      // asffasf...
      const objToSend : any = {};
      const toKeep = [ ['provider', 'provider'], ['providerAccountId', 'provider_account_id'], ['access_token', 'access_token'], ['refresh_token', 'refresh_token'], ['access_token_expires_at', 'access_token_expires_at']];
      toKeep.forEach((arr : any) => {
        const accountKey = arr[0];
        const objToSendKey = arr[1];
        if (accountKey === 'provider') 
          account[accountKey] = account[accountKey].toUpperCase();
 
        objToSend[objToSendKey] = account[accountKey];
      })
      try {
          const {data} = await axios.post(providerAuthUrlApi, {
            user,
            account : objToSend,
          });

          return data?.data;

      } catch (error) {
        console.log(error, "error while signIn");
      }
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  debug: process.env.NODE_ENV === "development",
};