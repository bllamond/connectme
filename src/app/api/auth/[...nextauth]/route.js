import client from "@/libs/mongoClient";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(client),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://connectme-delta.vercel.app/api/auth/callback/google",
        })
    ] 

};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }