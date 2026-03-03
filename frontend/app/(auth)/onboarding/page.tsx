'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Instagram, Twitter, Youtube, TrendingUp, Loader2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const NICHES = [
  'Fashion', 'Beauty', 'Fitness', 'Tech', 'Gaming', 'Food', 'Travel',
  'Lifestyle', 'Business', 'Education', 'Entertainment', 'Sports', 'Health'
]

export default function OnboardingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  
  // Influencer fields
  const [instagramHandle, setInstagramHandle] = useState('')
  const [twitterHandle, setTwitterHandle] = useState('')
  const [tiktokHandle, setTiktokHandle] = useState('')
  const [youtubeChannel, setYoutubeChannel] = useState('')
  const [selectedNiches, setSelectedNiches] = useState<string[]>([])
  const [location, setLocation] = useState('')
  const [bio, setBio] = useState('')
  
  // Brand fields
  const [companyName, setCompanyName] = useState('')
  const [website, setWebsite] = useState('')
  const [industry, setIndustry] = useState<string[]>([])
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const userRole = (session?.user as any)?.role

  const handleNicheToggle = (niche: string) => {
    setSelectedNiches(prev =>
      prev.includes(niche)
        ? prev.filter(n => n !== niche)
        : [...prev, niche]
    )
  }

  const handleIndustryToggle = (ind: string) => {
    setIndustry(prev =>
      prev.includes(ind)
        ? prev.filter(i => i !== ind)
        : [...prev, ind]
    )
  }

  const handleSubmitInfluencer = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/onboarding/influencer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instagramHandle,
          twitterHandle,
          tiktokHandle,
          youtubeChannel,
          niches: selectedNiches,
          location,
          bio,
        }),
      })

      if (response.ok) {
        router.push('/influencer/dashboard')
      }
    } catch (error) {
      console.error('Onboarding error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitBrand = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/onboarding/brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          website,
          industry,
          description,
        }),
      })

      if (response.ok) {
        router.push('/brand/dashboard')
      }
    } catch (error) {
      console.error('Onboarding error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (userRole === 'INFLUENCER') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Welcome to SocialStance</h1>
            </div>
            <p className="text-muted-foreground">Let&apos;s set up your influencer profile</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Connect Your Social Accounts</CardTitle>
              <CardDescription>
                Add your social media handles to start tracking your analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-pink-500" />
                    Instagram Handle
                  </Label>
                  <Input
                    id="instagram"
                    placeholder="@username"
                    value={instagramHandle}
                    onChange={(e) => setInstagramHandle(e.target.value)}
                    data-testid="instagram-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter" className="flex items-center gap-2">
                    <Twitter className="h-4 w-4 text-blue-500" />
                    Twitter Handle
                  </Label>
                  <Input
                    id="twitter"
                    placeholder="@username"
                    value={twitterHandle}
                    onChange={(e) => setTwitterHandle(e.target.value)}
                    data-testid="twitter-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="youtube" className="flex items-center gap-2">
                    <Youtube className="h-4 w-4 text-red-500" />
                    YouTube Channel
                  </Label>
                  <Input
                    id="youtube"
                    placeholder="Channel name or ID"
                    value={youtubeChannel}
                    onChange={(e) => setYoutubeChannel(e.target.value)}
                    data-testid="youtube-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    data-testid="bio-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    data-testid="location-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Select Your Niches</Label>
                  <div className="flex flex-wrap gap-2">
                    {NICHES.map((niche) => (
                      <Badge
                        key={niche}
                        variant={selectedNiches.includes(niche) ? 'default' : 'outline'}
                        className="cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => handleNicheToggle(niche)}
                        data-testid={`niche-${niche.toLowerCase()}`}
                      >
                        {niche}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleSubmitInfluencer}
                disabled={loading || selectedNiches.length === 0}
                data-testid="complete-onboarding-btn"
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Setting up...</>
                ) : (
                  'Complete Setup'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (userRole === 'BRAND') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-100 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Welcome to SocialStance</h1>
            </div>
            <p className="text-muted-foreground">Let&apos;s set up your brand profile</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Tell Us About Your Brand</CardTitle>
              <CardDescription>
                Help us match you with the perfect influencers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    placeholder="Acme Corp"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    data-testid="company-name-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://example.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    data-testid="website-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <textarea
                    id="description"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us about your company..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    data-testid="description-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Select Your Industry</Label>
                  <div className="flex flex-wrap gap-2">
                    {NICHES.map((ind) => (
                      <Badge
                        key={ind}
                        variant={industry.includes(ind) ? 'default' : 'outline'}
                        className="cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => handleIndustryToggle(ind)}
                        data-testid={`industry-${ind.toLowerCase()}`}
                      >
                        {ind}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleSubmitBrand}
                disabled={loading || !companyName || industry.length === 0}
                data-testid="complete-onboarding-btn"
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Setting up...</>
                ) : (
                  'Complete Setup'
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return null
}
