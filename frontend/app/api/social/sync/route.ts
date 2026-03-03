import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { fetchSocialMetrics } from '@/lib/apify'

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = (session.user as any).id
    const prismaClient = await prisma

    const profile = await prismaClient.influencerProfile.findUnique({
      where: { userId },
    })

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }

    const platforms = []
    if (profile.instagramHandle) platforms.push({ platform: 'instagram', handle: profile.instagramHandle })
    if (profile.twitterHandle) platforms.push({ platform: 'twitter', handle: profile.twitterHandle })
    if (profile.tiktokHandle) platforms.push({ platform: 'tiktok', handle: profile.tiktokHandle })

    const results: any = {}
    let totalFollowers = 0
    let totalEngagement = 0
    let platformCount = 0

    for (const { platform, handle } of platforms) {
      try {
        const metrics = await fetchSocialMetrics(platform, handle)
        
        if (metrics) {
          results[platform] = metrics
          
          // Store in database
          await prismaClient.socialMetrics.create({
            data: {
              influencerId: profile.id,
              platform,
              metrics: metrics as any,
            },
          })

          // Calculate aggregates
          const followers = Number(metrics.followers || metrics.follower_count || 0)
          const engagement = Number(metrics.engagement_rate || 0)
          
          totalFollowers += followers
          totalEngagement += engagement
          platformCount++
        }
      } catch (error) {
        console.error(`Error fetching ${platform} metrics:`, error)
      }
    }

    // Update profile with aggregated data
    const avgEngagement = platformCount > 0 ? totalEngagement / platformCount : 0
    
    await prismaClient.influencerProfile.update({
      where: { userId },
      data: {
        followers: results,
        engagementRate: avgEngagement,
        lastScraped: new Date(),
      },
    })

    // Trigger fraud detection
    await fetch(`${process.env.NEXTAUTH_URL}/api/fraud/detect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ influencerId: profile.id }),
    })

    return NextResponse.json({ success: true, data: results })
  } catch (error) {
    console.error('Social sync error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
