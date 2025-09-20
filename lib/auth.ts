import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import { verifyPassword } from '@/lib/auth-utils'
import { z } from 'zod'

// Schema สำหรับ validation
const loginSchema = z.object({
  email: z.string().email('กรุณาใส่อีเมลที่ถูกต้อง'),
  password: z.string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
})

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { 
          label: 'อีเมล', 
          type: 'email',
          placeholder: 'example@email.com'
        },
        password: { 
          label: 'รหัสผ่าน', 
          type: 'password' 
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('กรุณาใส่อีเมลและรหัสผ่าน')
        }

        // Validate input
        const validation = loginSchema.safeParse(credentials)
        if (!validation.success) {
          throw new Error(validation.error.issues[0].message)
        }

        try {
          // ค้นหาผู้ใช้ในฐานข้อมูล
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user) {
            throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
          }

          // ตรวจสอบรหัสผ่าน
          const isPasswordValid = await verifyPassword(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            throw new Error('อีเมลหรือรหัสผ่านไม่ถูกต้อง')
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image,
          }
        } catch (error) {
          console.error('Authentication error:', error)
          throw error
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as 'USER' | 'ADMIN'
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
}