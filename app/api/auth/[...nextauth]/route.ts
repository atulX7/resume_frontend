import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"


const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
// ✅ Function to Refresh Access Token
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(GOOGLE_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        refresh_token: token.refreshToken,
        grant_type: "refresh_token",
      }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // Extend expiry
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Keep existing refresh token
    };
  } catch (error) {
    console.error("Failed to refresh access token", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
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
      if (user && account) {
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token; // ✅ Store refresh token
        if (account.expires_at) {
          token.accessTokenExpires = account.expires_at * 1000; // ✅ Convert to milliseconds
        } else {
          console.error("⚠️ No expires_at found in account response.");
          token.accessTokenExpires = Date.now() + (60 * 60 * 1000);  // Fallback to 1 hour
        }


        // ✅ Step 1: Sync user with FastAPI
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sync-user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_token:token.accessToken
          }),
        });

        const data = await res.json();
        token.id = data.user_id;  // ✅ Step 2: Store user.id in token
      }
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
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