import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, TrendingUp, Shield, Zap, Sparkles, Users, BarChart } from 'lucide-react'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      {/* Hero Section */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 transition-transform group-hover:scale-110">
            <Image 
              src="https://customer-assets.emergentagent.com/job_creator-metrics-14/artifacts/qjdd3o2t_image.png"
              alt="SocialStance Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">SocialStance</span>
        </Link>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost" className="hover:bg-white/50">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30" data-testid="get-started-btn">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg mb-8 border border-indigo-100">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-600">Trusted by 10,000+ Creators</span>
          </div>

          <h1 className="text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">Connect Brands with</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Authentic Influencers</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            The most advanced influencer marketplace with real-time analytics,
            AI-powered fraud detection, and automated partnerships.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup?role=brand">
              <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl shadow-blue-500/30 h-14">
                I&apos;m a Brand
              </Button>
            </Link>
            <Link href="/signup?role=influencer">
              <Button size="lg" variant="outline" className="text-lg px-8 border-2 border-indigo-200 hover:bg-white/50 h-14">
                I&apos;m an Influencer
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-3xl mx-auto">
            <div className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">50M+</p>
              <p className="text-sm text-slate-600 mt-2">Total Reach</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">10K+</p>
              <p className="text-sm text-slate-600 mt-2">Active Creators</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">98%</p>
              <p className="text-sm text-slate-600 mt-2">Success Rate</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-32 max-w-6xl mx-auto">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
            <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-100 hover:shadow-2xl transition-all">
              <div className="h-14 w-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <BarChart className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Real-Time Analytics</h3>
              <p className="text-slate-600 leading-relaxed">
                Track engagement, followers, and performance metrics across all major platforms with live updates.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
            <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-100 hover:shadow-2xl transition-all">
              <div className="h-14 w-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">AI Fraud Detection</h3>
              <p className="text-slate-600 leading-relaxed">
                Advanced AI-powered fraud detection ensures you work with authentic influencers and real engagement.
              </p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
            <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-100 hover:shadow-2xl transition-all">
              <div className="h-14 w-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <Zap className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Automated Media Kits</h3>
              <p className="text-slate-600 leading-relaxed">
                Generate professional media kits automatically with live data, portfolio, and verified metrics.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-20"></div>
          <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-16 text-center shadow-2xl">
            <Users className="h-16 w-16 text-white/80 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Influence?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of creators and brands building authentic partnerships
            </p>
            <Link href="/signup">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-blue-50 text-lg px-10 h-14 shadow-xl">
                Start Free Today <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-indigo-100 relative z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image 
                src="https://customer-assets.emergentagent.com/job_creator-metrics-14/artifacts/qjdd3o2t_image.png"
                alt="SocialStance"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-sm text-slate-600">© 2025 SocialStance. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-sm text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition">Privacy</a>
            <a href="#" className="hover:text-indigo-600 transition">Terms</a>
            <a href="#" className="hover:text-indigo-600 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
