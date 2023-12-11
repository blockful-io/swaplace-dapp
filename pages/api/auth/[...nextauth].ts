import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SiweMessage } from "siwe";

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        message: {
          label: "Address",
          type: "text",
          placeholder: "Address",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "Signature",
        },
      },
      authorize: async (credentials) => {
        const { message, signature } = credentials as any;
        const siweMessage = new SiweMessage(JSON.parse(message));
        const fields = await siweMessage.validate(signature);

        const { address } = fields;
        const ethereumAddress = address.toLowerCase();

        return { id: ethereumAddress, address: ethereumAddress };
      },
    }),
  ],
  session: {
    maxAge: 365 * 24 * 60 * 60, // 1 year
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.address;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    },
  },
  secret: process.env.JWT_SECRET,
});
