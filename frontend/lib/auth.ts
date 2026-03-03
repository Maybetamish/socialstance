import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('🔐 AUTHORIZE called with email:', credentials?.email)
        
        if (!credentials?.email || !credentials?.password) {
          console.log('❌ Missing credentials')
          return null
        }

        try {
          const prismaClient = await prisma
          const user = await prismaClient.user.findUnique({
            where: {
              email: credentials.email,
            },
          })

          console.log('📊 User lookup result:', user ? 'FOUND' : 'NOT FOUND')

          if (!user || !user.password) {
            console.log('❌ User not found or no password')
            return null
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          )

          console.log('🔑 Password check:', isCorrectPassword ? 'VALID' : 'INVALID')

          if (!isCorrectPassword) {
            return null
          }

          console.log('✅ Authorization successful for:', user.email)

          // Return user object
          return {
            id: user.id,
            email: user.email!,
            name: user.name!,
            role: user.role,
          }
        } catch (error) {
          console.error('❌ Authorize error:', error)
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      console.log('🎫 JWT callback - user:', !!user, 'token:', !!token)
      
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = (user as any).role
        console.log('✅ JWT token created with role:', token.role)
      }
      return token
    },
    async session({ session, token }) {
      console.log('📝 Session callback - token role:', token.role)
      
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.role = token.role as string
        console.log('✅ Session created for:', session.user.email)
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
}

console.log('🔧 Auth config initialized')
console.log('   NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
console.log('   NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? 'SET' : 'MISSING')