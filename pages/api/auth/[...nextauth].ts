import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: { 
                  prompt: "consent",
                  access_type: "offline", 
                  response_type: "code"
                }
            }
        }),
        // ...add more providers here
    ],
    pages: { 
        signIn: "/auth/signin"
    },
    callbacks: {
        async session({ session, token }: any) {
            session.user.username = session.user.name.split(' ').join('').toLowerCase();
            session.user.uid = token.sub;
            return session;
        }
    }
}
export default NextAuth(authOptions)