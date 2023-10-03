import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github";

import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt", },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ]
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};
