import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { name, email, password, role } = await request.json()
    const prismaClient = await prisma

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as 'INFLUENCER' | 'BRAND',
      },
    })

    // Create profile based on role
    if (role === 'INFLUENCER') {
      await prismaClient.influencerProfile.create({
        data: {
          userId: user.id,
          niches: [],
        },
      })
    } else if (role === 'BRAND') {
      await prismaClient.brandProfile.create({
        data: {
          userId: user.id,
          companyName: name || '',
          industry: [],
        },
      })
    }

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
