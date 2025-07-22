import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Trouver l'utilisateur par email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        // Vérifier le mot de passe
        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) return null;

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Stocke l'ID utilisateur dans le token
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id; // Ajoute l'ID utilisateur à la session
      }
      return session;
    },
  },

  pages: {
    signIn: "/login", // Page de connexion personnalisée
  },

  secret: process.env.NEXTAUTH_SECRET, // À définir dans ton .env
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
