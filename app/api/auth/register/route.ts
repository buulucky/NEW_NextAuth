import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth-utils'
import { z } from 'zod'

// Schema สำหรับ validation
const registerSchema = z.object({
  name: z.string().min(2, 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร'),
  email: z.string().email('กรุณาใส่อีเมลที่ถูกต้อง'),
  password: z.string().min(6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'),
  company_id: z.number().min(1, 'กรุณาเลือกบริษัท'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const validation = registerSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'ข้อมูลไม่ถูกต้อง',
          details: validation.error.issues.map(issue => issue.message)
        },
        { status: 400 }
      )
    }

    const { name, email, password, company_id } = validation.data

    // ตรวจสอบว่าอีเมลนี้มีอยู่แล้วหรือไม่
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'อีเมลนี้มีผู้ใช้แล้ว' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // สร้างผู้ใช้ใหม่
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER', // Default role
        company_id: company_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    })

    return NextResponse.json(
      { 
        message: 'สร้างบัญชีผู้ใช้สำเร็จ',
        user 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดภายในระบบ' },
      { status: 500 }
    )
  }
}