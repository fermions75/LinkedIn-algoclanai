

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";


export const  { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          try {
            const response = await fetch(`${process.env.API_URL}/auth/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
              console.error("Failed to fetch user:", response.statusText);
              return null;
            }

            const { user, token } = await response.json();

            if (!user) {
              throw new Error("User not found.");
            }

            // console.log("my user", user);

            // Return user object formatted for NextAuth
            return { user, token };
          } catch (error) {
            console.error("Error during user authorization:", error);
            throw new Error("Internal server error.");
          }
        }
        throw new Error("Invalid Credentials.");
      },
    }),
  ],
});
