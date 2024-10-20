import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { fetchAdmins } from "@/lib/api";

const handler = NextAuth({
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "google" && user) {
        const { admins } = await fetchAdmins();
        const envAdminEmail = process.env.ADMIN_EMAIL;
        const adminEmails = admins.map((admin) => admin.email);
        if (envAdminEmail) {
          adminEmails.push(envAdminEmail);
        }
        token.isAdmin = user.email && adminEmails.includes(user.email);
      }
      return token;
    },
    async session({ session, token }) {
      session.user.isAdmin = token.isAdmin as boolean;
      return session;
    },
  },
  debug: true,
});

export { handler as GET, handler as POST };
