import { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma-client";
import { compare, hashSync } from "bcrypt";
import { UserRole } from "@prisma/client";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "USER" as UserRole,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("No credentials provided");
        }

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        if (!user.verified) {
          throw new Error("User not verified");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      try {
        if (account?.provider === "credentials") {
          return true;
        }

        if (!user.email) {
          return false;
        }

        const foundUser = await prisma.user.findFirst({
          where: {
            OR: [
              { email: user.email },
              {
                provider: account?.provider as string,
                providerId: account?.providerAccountId as string,
              },
            ],
          },
        });

        if (foundUser) {
          await prisma.user.update({
            where: { id: foundUser.id },
            data: {
              provider: account?.provider as string,
              providerId: account?.providerAccountId as string,
            },
          });

          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || `User #${user.id}`,
            password: hashSync(user.id.toString(), 10),
            verified: new Date(),
            provider: account?.provider as string,
            providerId: account?.providerAccountId as string,
          },
        });

        return true;
      } catch (error) {
        console.error("Error [SIGNIN]", error);
        return false;
      }
    },
    jwt: async ({ token }) => {
      const user = await prisma.user.findFirst({
        where: { email: token.email as string },
      });

      if (user) {
        token.id = user.id.toString();
        token.email = user.email;
        token.fullName = user.fullName;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
};
