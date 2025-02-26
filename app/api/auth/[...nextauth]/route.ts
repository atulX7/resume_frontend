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
      if (account) {
        token.id_token = account.id_token
      }
      if (user) {
        token.role = user.role || 'USER'
      }
      return token
    },
    async session({ session, token }) {
      console.log("token.id_token", token.id_token)
      if (session?.user) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google-login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token.id_token}`
            },
            body: JSON.stringify({
              id_token: token.id_token,
            })
          });
          const data = await response.json();
          console.log("data", data)
          // Handle response if needed
        } catch (error) {
          console.error('Session callback POST error:', error);
        }

        session.user = {
          ...session.user,
          id: token.sub as string,
          role: token.role as string,
        }
      }
      return session
    }
  }
})

export { handler as GET, handler as POST }