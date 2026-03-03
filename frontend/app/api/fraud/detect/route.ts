import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { influencerId } = await request.json()
    const prismaClient = await prisma

    if (!influencerId) {
      return NextResponse.json({ error: 'Missing influencerId' }, { status: 400 })
    }

    // Fetch recent metrics
    const metrics = await prismaClient.socialMetrics.findMany({
      where: { influencerId },
      orderBy: { fetchedAt: 'desc' },
      take: 30,
    })

    if (metrics.length === 0) {
      return NextResponse.json({ error: 'No metrics found' }, { status: 404 })
    }

    // Analyze fraud patterns
    const analysis = {
      followerGrowthAnomaly: analyzeGrowthPattern(metrics),
      engagementAuthenticity: analyzeEngagementPattern(metrics),
      overallConsistency: analyzeConsistency(metrics),
    }

    // Calculate overall authenticity score (0-100)
    let score = 100
    
    // Deduct points for anomalies
    if (analysis.followerGrowthAnomaly.hasSpikes) score -= 30
    if (!analysis.engagementAuthenticity.isNatural) score -= 20
    if (analysis.overallConsistency.score < 0.7) score -= 15
    
    score = Math.max(0, Math.min(100, score))

    const flags = []
    if (analysis.followerGrowthAnomaly.hasSpikes) flags.push('Sudden follower spikes detected')
    if (!analysis.engagementAuthenticity.isNatural) flags.push('Engagement pattern appears artificial')
    if (analysis.overallConsistency.score < 0.5) flags.push('Inconsistent posting behavior')

    // Store fraud detection results
    await prismaClient.fraudDetectionLog.create({
      data: {
        influencerId,
        analysis: analysis as any,
        overallScore: score,
        flags,
      },
    })

    // Update influencer profile
    await prismaClient.influencerProfile.update({
      where: { id: influencerId },
      data: { authenticityScore: score },
    })

    return NextResponse.json({ score, analysis, flags })
  } catch (error) {
    console.error('Fraud detection error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function analyzeGrowthPattern(metrics: any[]) {
  if (metrics.length < 2) return { hasSpikes: false, consistency: 1 }
  
  const growthRates = []
  for (let i = 1; i < metrics.length; i++) {
    const current = metrics[i].metrics?.followers || 0
    const previous = metrics[i - 1].metrics?.followers || 0
    if (previous > 0) {
      growthRates.push((current - previous) / previous)
    }
  }
  
  if (growthRates.length === 0) return { hasSpikes: false, consistency: 1 }
  
  const avgGrowth = growthRates.reduce((a, b) => a + b, 0) / growthRates.length
  const hasSpikes = growthRates.some(rate => Math.abs(rate) > avgGrowth * 3)
  
  return { hasSpikes, avgGrowth, consistency: hasSpikes ? 0.5 : 1 }
}

function analyzeEngagementPattern(metrics: any[]) {
  if (metrics.length < 5) return { isNatural: true, variance: 0 }
  
  const engagementRates = metrics
    .map(m => m.metrics?.engagement_rate || 0)
    .filter(r => r > 0)
  
  if (engagementRates.length === 0) return { isNatural: true, variance: 0 }
  
  const avg = engagementRates.reduce((a, b) => a + b, 0) / engagementRates.length
  const variance = engagementRates.reduce((sum, rate) => sum + Math.pow(rate - avg, 2), 0) / engagementRates.length
  
  // Natural engagement has some variance, too consistent is suspicious
  const isNatural = variance > 0.01 && variance < 10
  
  return { isNatural, variance, average: avg }
}

function analyzeConsistency(metrics: any[]) {
  if (metrics.length < 3) return { score: 1, isConsistent: true }
  
  const timestamps = metrics.map(m => new Date(m.fetchedAt).getTime())
  const intervals = []
  
  for (let i = 1; i < timestamps.length; i++) {
    intervals.push(timestamps[i - 1] - timestamps[i])
  }
  
  const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length
  const consistency = intervals.filter(i => Math.abs(i - avgInterval) < avgInterval * 0.5).length / intervals.length
  
  return { score: consistency, isConsistent: consistency > 0.7 }
}
