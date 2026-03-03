import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const niche = searchParams.get('niche') || 'all'
    const minFollowers = parseInt(searchParams.get('minFollowers') || '0')
    const minAuthScore = parseInt(searchParams.get('minAuthScore') || '0')
    const search = searchParams.get('search') || ''

    const where: any = {
      authenticityScore: { gte: minAuthScore },
    }

    if (niche !== 'all') {
      where.niches = { has: niche.charAt(0).toUpperCase() + niche.slice(1) }
    }

    if (search) {
      where.OR = [
        { user: { name: { contains: search, mode: 'insensitive' } } },
        { instagramHandle: { contains: search, mode: 'insensitive' } },
        { twitterHandle: { contains: search, mode: 'insensitive' } },
      ]
    }

    const prismaClient = await prisma
    const influencers = await prismaClient.influencerProfile.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        authenticityScore: 'desc',
      },
      take: 50,
    })

    // Filter by followers (need to parse JSON)
    const filteredInfluencers = influencers.filter((inf) => {
      if (!inf.followers || minFollowers === 0) return true
      const followersObj = inf.followers as Record<string, number>
      const totalFollowers = Object.values(followersObj)
        .reduce((a: number, b: number) => a + b, 0)
      return totalFollowers >= minFollowers
    })

    return NextResponse.json({ influencers: filteredInfluencers })
  } catch (error) {
    console.error('Influencer search error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
