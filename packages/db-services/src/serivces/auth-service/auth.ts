import { getServerSession, type NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authenticateUser, getUserAuthProfile } from "./authService"

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && account.type === "credentials") {
                const { providerAccountId } = account
                const user = await getUserAuthProfile(providerAccountId)
                token = {
                    ...token,
                    ...user,
                    userId: providerAccountId
                }
                return { token, user }
            }
            return { token }
        },
        // @ts-ignore
        async session({ session, token, user }) {
            // @ts-ignore
            return { ...token, session, user }
        }
    },
    pages: {
        signIn: "/cms/login"
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { username, password } = credentials as {
                    username: string
                    password: string
                }

                const res = authenticateUser(username, password)
                return res
            }
        })
    ]
}

export const getServerAuthSession = () => getServerSession(authOptions)
