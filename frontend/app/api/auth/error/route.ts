import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const error = searchParams.get('error')
  
  console.error('❌ NextAuth Error:', error)
  console.error('Full URL:', request.url)
  
  return NextResponse.json({
    error: error || 'Unknown error',
    message: 'Authentication error occurred',
    timestamp: new Date().toISOString(),
  }, { status: 401 })
}
