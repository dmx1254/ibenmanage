import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ibenModels } from "@/lib/models/ibendouma-models";
import bcrypt from "bcrypt";

export const options: NextAuthOptions = {
  pages: {
    signIn: "/",
    signOut: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 3,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req
      ) {
        const { UserIbenModel } = await ibenModels;
        if (credentials) {
          const user = await UserIbenModel.findOne({
            email: credentials.email,
          });
          if (!user) {
            throw new Error("Pas d'utilisateur avec cet email");
          }

          if (!user.isAdmin) {
            throw new Error("Vous n'êtes pas autorise à vous connecter");
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isCorrectPassword) {
            throw new Error("Mot de passe incorrect");
          }

          return {
            id: user._id.toString(),
            name: `${user.lastname} ${user.firstname}`,
            email: user.email,
            isAdmin: user.role,
          };
        }
        return null; // Assurez-vous de retourner null si credentials est undefined
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.isAdmin = token.isAdmin as boolean;
      }
      return session;
    },
    // async redirect({ url, baseUrl, token }) {
    //   if (token?.role === "DOCTEUR") {
    //     return baseUrl + "/dashboard";
    //   } else {
    //     return `${baseUrl}/patient/${token?.id}/profile#informations-personnelles`;
    //   }
    // },
  },
};
