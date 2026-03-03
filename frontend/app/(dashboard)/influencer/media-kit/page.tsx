'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Download, Sparkles, Loader2, LogOut } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function MediaKitPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const [generating, setGenerating] = useState(false)

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
      console.error('Error:', error)
    }
  }

  const generateMediaKit = async () => {
    setGenerating(true)
    try {
      const response = await fetch('/api/mediakit/generate', {
        method: 'POST',
      })
      const data = await response.json()
      
      if (data.url) {
        window.open(data.url, '_blank')
      }
    } catch (error) {
      console.error('Generate error:', error)
    } finally {
      setGenerating(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const totalFollowers = profile?.followers ? 
    Object.values(profile.followers as Record<string, number>).reduce((a: number, b: number) => a + b, 0) : 0

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
            <Link href="/influencer/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition">
              Dashboard
            </Link>
            <Link href="/influencer/analytics" className="text-sm font-medium text-muted-foreground hover:text-primary transition">
              Analytics
            </Link>
            <Link href="/influencer/media-kit" className="text-sm font-medium text-primary">
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
              <Sparkles className="h-10 w-10 text-primary" />
              Media Kit Generator
            </h1>
            <p className="text-muted-foreground">Create a professional media kit instantly with your live data</p>
          </div>

          {/* Preview Card */}
          <Card className="shadow-2xl mb-8">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
              <CardTitle className="text-2xl">{session?.user?.name || 'Your Name'}</CardTitle>
              <CardDescription className="text-white/90">
                Influencer • Content Creator
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg">
                    <p className="text-3xl font-bold text-primary">{totalFollowers.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground mt-1">Total Followers</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                    <p className="text-3xl font-bold text-blue-600">{profile?.engagementRate?.toFixed(1) || '0'}%</p>
                    <p className="text-sm text-muted-foreground mt-1">Engagement Rate</p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                    <p className="text-3xl font-bold text-purple-600">{profile?.authenticityScore || 0}/100</p>
                    <p className="text-sm text-muted-foreground mt-1">Authenticity Score</p>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">About Me</h3>
                  <p className="text-muted-foreground">
                    {profile?.bio || 'Your bio will appear here. Add it in your profile settings.'}
                  </p>
                </div>

                {/* Niches */}
                {profile?.niches && profile.niches.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Content Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.niches.map((niche: string) => (
                        <span key={niche} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                          {niche}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Platforms */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Social Platforms</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {profile?.instagramHandle && (
                      <div className="p-3 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Instagram</p>
                        <p className="font-medium">@{profile.instagramHandle}</p>
                      </div>
                    )}
                    {profile?.twitterHandle && (
                      <div className="p-3 border rounded-lg">
                        <p className="text-sm text-muted-foreground">Twitter</p>
                        <p className="font-medium">@{profile.twitterHandle}</p>
                      </div>
                    )}
                    {profile?.youtubeChannel && (
                      <div className="p-3 border rounded-lg">
                        <p className="text-sm text-muted-foreground">YouTube</p>
                        <p className="font-medium">{profile.youtubeChannel}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">Ready to Generate?</h3>
              <p className="text-muted-foreground mb-6">
                Your media kit will include all your stats, portfolio, and social proof in a professional PDF format.
              </p>
              <Button 
                size="lg" 
                className="px-8"
                onClick={generateMediaKit}
                disabled={generating}
                data-testid="generate-mediakit-btn"
              >
                {generating ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Generating...</>
                ) : (
                  <><Download className="mr-2 h-5 w-5" />Generate Media Kit</>
                )}
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                * Media kit will be generated with your latest data
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
