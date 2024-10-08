

export const authConfig = {
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/signup'
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnLoginPage = nextUrl.pathname.startsWith('/login')
      const isOnSignupPage = nextUrl.pathname.startsWith('/signup')

      if (isLoggedIn) {
        if (isOnLoginPage || isOnSignupPage) {
          return Response.redirect(new URL('/dashboard', nextUrl))
        }
      }

      return true
    },
    async jwt({ token, user }) {
        if (user) {
          token.sub = user.user.id;
          token.email = user.user.email;
          token.name = user.user.name;
          token.accessToken = user.token;
          }
          // console.log(token)
          return token;
    },
    async session({ session, token }) {
        if (token) {
          session.user.id = token.sub;
          session.user.email = token.email;
          session.user.name = token.name;
          session.accessToken = token.accessToken;
          }
          // console.log(session)
          return session;
        }
  },
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60, // 3 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: []
} 