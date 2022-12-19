import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import { FirestoreAdapter } from "@next-auth/firebase-adapter"

export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CONSUMER_KEY as string,
            clientSecret: process.env.TWITTER_CONSUMER_SECRET as string,
        })
        // ...add more providers here
    ],
    adapter: FirestoreAdapter({
        apiKey: process.env.NEXT_PUBLIC_APIKEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
    }),
    pages: { 
        signIn: "/auth/signin"
    },
    callbacks: {
        async session({session, user }) {
            return {
                user: user,
                expires: session.expires,
            }
        }
    }
}

export default NextAuth(authOptions)