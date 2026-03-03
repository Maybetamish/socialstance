'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, Users, Heart, Eye, Shield, FileText, 
  Instagram, Twitter, Youtube, RefreshCw, Loader2, LogOut,
  BarChart3, Sparkles
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function InfluencerDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchProfile()
    }
  }, [status, router])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/influencer/profile')
      const data = await response.json()
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const syncSocialMedia = async () => {
    setSyncing(true)
    try {
      await fetch('/api/social/sync', { method: 'POST' })
      await fetchProfile()
    } catch (error) {
      console.error('Sync error:', error)
    } finally {
      setSyncing(false)
    }
  }

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const totalFollowers = profile?.followers ? 
    Object.values(profile.followers as Record<string, number>).reduce((a: number, b: number) => a + b, 0) : 0

  const authenticityColor = 
    profile?.authenticityScore >= 70 ? 'text-green-500' : 
    profile?.authenticityScore >= 40 ? 'text-yellow-500' : 
    'text-red-500'

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SocialStance</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/influencer/dashboard" className="text-sm font-medium text-primary">
              Dashboard
            </Link>
            <Link href="/influencer/analytics" className="text-sm font-medium text-muted-foreground hover:text-primary transition">
              Analytics
            </Link>
            <Link href="/influencer/media-kit" className="text-sm font-medium text-muted-foreground hover:text-primary transition">
              Media Kit
            </Link>
            <Button variant="ghost" size="icon" onClick={() => router.push('/api/auth/signout')}>
              <LogOut className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, {session?.user?.name}! 👋</h1>
          <p className="text-muted-foreground">Here&apos;s your performance overview</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-pink-500 to-rose-500 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Total Followers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold" data-testid="total-followers">
                    {totalFollowers.toLocaleString()}
                  </p>
                  <p className="text-xs opacity-90 mt-1">Across all platforms</p>
                </div>
                <Users className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Engagement Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold" data-testid="engagement-rate">
                    {profile?.engagementRate?.toFixed(1) || '0'}%
                  </p>
                  <p className="text-xs opacity-90 mt-1">Average across posts</p>
                </div>
                <Heart className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Authenticity Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold" data-testid="authenticity-score">
                    {profile?.authenticityScore || 0}/100
                  </p>
                  <p className="text-xs opacity-90 mt-1">Verified metrics</p>
                </div>
                <Shield className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg hover:shadow-xl transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Potential Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold" data-testid="potential-earnings">
                    ${((totalFollowers / 1000) * 10).toLocaleString()}
                  </p>
                  <p className="text-xs opacity-90 mt-1">Estimated per post</p>
                </div>
                <Sparkles className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Accounts & Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Connected Accounts */}
          <Card className="md:col-span-2 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Connected Accounts</CardTitle>
                  <CardDescription>Your social media profiles</CardDescription>
                </div>
                <Button 
                  size="sm" 
                  onClick={syncSocialMedia} 
                  disabled={syncing}
                  data-testid="sync-button"
                >
                  {syncing ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Syncing...</>
                  ) : (
                    <><RefreshCw className="mr-2 h-4 w-4" />Sync Now</>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile?.instagramHandle && (
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-full">
                      <Instagram className="h-5 w-5 text-pink-500" />
                    </div>
                    <div>
                      <p className="font-medium">Instagram</p>
                      <p className="text-sm text-muted-foreground">@{profile.instagramHandle}</p>
                    </div>
                  </div>
                  <Badge variant="success">Connected</Badge>
                </div>
              )}
              
              {profile?.twitterHandle && (
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-full">
                      <Twitter className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Twitter</p>
                      <p className="text-sm text-muted-foreground">@{profile.twitterHandle}</p>
                    </div>
                  </div>
                  <Badge variant="success">Connected</Badge>
                </div>
              )}
              
              {profile?.youtubeChannel && (
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-full">
                      <Youtube className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">YouTube</p>
                      <p className="text-sm text-muted-foreground">{profile.youtubeChannel}</p>
                    </div>
                  </div>
                  <Badge variant="success">Connected</Badge>
                </div>
              )}

              {!profile?.instagramHandle && !profile?.twitterHandle && !profile?.youtubeChannel && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No accounts connected yet</p>
                  <Link href="/onboarding">
                    <Button variant="link" className="mt-2">Connect accounts</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Fraud Score Card */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Authenticity Score</CardTitle>
              <CardDescription>Your credibility rating</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-gray-200"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(profile?.authenticityScore || 0) * 3.51} 351`}
                      className={authenticityColor}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className={`text-3xl font-bold ${authenticityColor}`}>
                        {profile?.authenticityScore || 0}
                      </p>
                      <p className="text-xs text-muted-foreground">out of 100</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Follower Quality</span>
                    <span className="font-medium">High</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Engagement</span>
                    <span className="font-medium">Authentic</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Growth Pattern</span>
                    <span className="font-medium">Natural</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with these features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/influencer/analytics" className="block">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg hover:shadow-md transition-all cursor-pointer">
                  <BarChart3 className="h-8 w-8 text-blue-500 mb-3" />
                  <h3 className="font-semibold mb-1">View Analytics</h3>
                  <p className="text-sm text-muted-foreground">Deep dive into your performance metrics</p>
                </div>
              </Link>
              
              <Link href="/influencer/media-kit" className="block">
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg hover:shadow-md transition-all cursor-pointer">
                  <FileText className="h-8 w-8 text-purple-500 mb-3" />
                  <h3 className="font-semibold mb-1">Generate Media Kit</h3>
                  <p className="text-sm text-muted-foreground">Create professional media kit instantly</p>
                </div>
              </Link>
              
              <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg hover:shadow-md transition-all cursor-pointer">
                <Eye className="h-8 w-8 text-green-500 mb-3" />
                <h3 className="font-semibold mb-1">Browse Deals</h3>
                <p className="text-sm text-muted-foreground">Explore brand collaboration opportunities</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
