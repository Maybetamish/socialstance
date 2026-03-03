'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, Search, Users, Briefcase, DollarSign, 
  Filter, Star, Shield, LogOut, Loader2, Eye
} from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const NICHES = [
  'Fashion', 'Beauty', 'Fitness', 'Tech', 'Gaming', 'Food', 'Travel',
  'Lifestyle', 'Business', 'Education', 'Entertainment', 'Sports', 'Health'
]

export default function BrandDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [influencers, setInfluencers] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNiche, setSelectedNiche] = useState('all')
  const [minFollowers, setMinFollowers] = useState('0')
  const [minAuthScore, setMinAuthScore] = useState('0')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    } else if (status === 'authenticated') {
      fetchProfile()
      fetchInfluencers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, router])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/brand/profile')
      const data = await response.json()
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchInfluencers = async () => {
    try {
      const params = new URLSearchParams({
        niche: selectedNiche,
        minFollowers,
        minAuthScore,
        search: searchQuery,
      })
      const response = await fetch(`/api/influencers/search?${params}`)
      const data = await response.json()
      setInfluencers(data.influencers || [])
    } catch (error) {
      console.error('Error fetching influencers:', error)
    }
  }

  useEffect(() => {
    if (status === 'authenticated') {
      fetchInfluencers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNiche, minFollowers, minAuthScore, searchQuery])

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SocialStance</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/brand/dashboard" className="text-sm font-medium text-primary">
              Discover
            </Link>
            <Link href="/brand/campaigns" className="text-sm font-medium text-muted-foreground hover:text-primary transition">
              Campaigns
            </Link>
            <Link href="/brand/deals" className="text-sm font-medium text-muted-foreground hover:text-primary transition">
              Deals
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
          <h1 className="text-4xl font-bold mb-2">Welcome, {profile?.companyName || session?.user?.name}! 🚀</h1>
          <p className="text-muted-foreground">Discover and connect with authentic influencers</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold" data-testid="active-campaigns">0</p>
                  <p className="text-xs opacity-90 mt-1">Running now</p>
                </div>
                <Briefcase className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Total Influencers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold" data-testid="total-influencers">{influencers.length}</p>
                  <p className="text-xs opacity-90 mt-1">In database</p>
                </div>
                <Users className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Budget Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold" data-testid="budget-spent">$0</p>
                  <p className="text-xs opacity-90 mt-1">This month</p>
                </div>
                <DollarSign className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Avg. ROI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold" data-testid="avg-roi">-</p>
                  <p className="text-xs opacity-90 mt-1">Return on investment</p>
                </div>
                <Star className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Discover Influencers
            </CardTitle>
            <CardDescription>Find the perfect creators for your brand</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by name, handle, or niche..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                    data-testid="search-input"
                  />
                </div>
                <Button data-testid="search-button">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Niche</label>
                  <Select value={selectedNiche} onValueChange={setSelectedNiche}>
                    <SelectTrigger data-testid="niche-select">
                      <SelectValue placeholder="All Niches" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Niches</SelectItem>
                      {NICHES.map(niche => (
                        <SelectItem key={niche} value={niche.toLowerCase()}>{niche}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Min. Followers</label>
                  <Select value={minFollowers} onValueChange={setMinFollowers}>
                    <SelectTrigger data-testid="followers-select">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any</SelectItem>
                      <SelectItem value="1000">1K+</SelectItem>
                      <SelectItem value="10000">10K+</SelectItem>
                      <SelectItem value="50000">50K+</SelectItem>
                      <SelectItem value="100000">100K+</SelectItem>
                      <SelectItem value="500000">500K+</SelectItem>
                      <SelectItem value="1000000">1M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Min. Authenticity Score</label>
                  <Select value={minAuthScore} onValueChange={setMinAuthScore}>
                    <SelectTrigger data-testid="auth-score-select">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any</SelectItem>
                      <SelectItem value="50">50+</SelectItem>
                      <SelectItem value="70">70+</SelectItem>
                      <SelectItem value="85">85+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Influencers Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Verified Influencers</h2>
            <Badge variant="secondary">{influencers.length} results</Badge>
          </div>

          {influencers.length === 0 ? (
            <Card className="shadow-lg">
              <CardContent className="py-12 text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">No influencers found</p>
                <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {influencers.map((influencer) => (
                <Card key={influencer.id} className="shadow-lg hover:shadow-xl transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                          {influencer.user?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{influencer.user?.name}</CardTitle>
                          <CardDescription className="text-xs">
                            {influencer.location || 'Location not set'}
                          </CardDescription>
                        </div>
                      </div>
                      {influencer.verified && (
                        <Badge variant="success" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {influencer.niches?.slice(0, 3).map((niche: string) => (
                        <Badge key={niche} variant="outline" className="text-xs">
                          {niche}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Followers</p>
                        <p className="font-semibold">
                          {influencer.followers ? 
                            Object.values(influencer.followers as Record<string, number>)
                              .reduce((a: number, b: number) => a + b, 0)
                              .toLocaleString() 
                            : '0'}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Engagement</p>
                        <p className="font-semibold">{influencer.engagementRate?.toFixed(1) || '0'}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Authenticity</p>
                        <p className="font-semibold">{influencer.authenticityScore || 0}/100</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Est. Cost</p>
                        <p className="font-semibold">
                          ${
                            influencer.followers ? 
                            Math.round(Object.values(influencer.followers as Record<string, number>)
                              .reduce((a: number, b: number) => a + b, 0) / 1000 * 10)
                              .toLocaleString()
                            : '0'
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1" size="sm" data-testid="view-profile-btn">
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm" data-testid="contact-btn">
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
