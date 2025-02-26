import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        
        if (account) {
          token.accessToken = account.access_token;  // ✅ Store access_token
        }
        // ✅ Step 1: Sync user with FastAPI
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sync-user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            image: user.image,
          }),
        });

        const data = await res.json();
        token.id = data.user_id;  // ✅ Step 2: Store user.id in token
      }
      return token;
    },
    async session({ session, token }) {
      console.log("token.id_token", token.id_token)
      if (session?.user) {
        session.user = {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
        }
      }
      session.accessToken = token.accessToken as string;
      return session
    }
  }
})

export { handler as GET, handler as POST }