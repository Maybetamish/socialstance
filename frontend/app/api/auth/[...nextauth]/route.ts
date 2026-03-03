import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// Add logging
console.log('NextAuth route initialized')
console.log('NextAuth URL:', process.env.NEXTAUTH_URL)
console.log('Has secret:', !!process.env.NEXTAUTH_SECRET)