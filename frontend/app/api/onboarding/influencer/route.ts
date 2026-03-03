import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const data = await request.json()
    const prismaClient = await prisma

    // Update influencer profile
    await prismaClient.influencerProfile.update({
      where: { userId },
      data: {
        instagramHandle: data.instagramHandle || null,
        twitterHandle: data.twitterHandle || null,
        tiktokHandle: data.tiktokHandle || null,
        youtubeChannel: data.youtubeChannel || null,
        niches: data.niches || [],
        location: data.location || null,
        bio: data.bio || null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
