import { ApifyClient } from 'apify-client'

const client = new ApifyClient({
  token: process.env.APIFY_TOKEN,
})

export const SOCIAL_ACTORS = {
  instagram: 'allanjblythe/social-analytics-pro-fixed',
  twitter: 'allanjblythe/social-analytics-pro-fixed',
  tiktok: 'allanjblythe/social-analytics-pro-fixed',
}

export async function fetchSocialMetrics(
  platform: string,
  handle: string
) {
  try {
    const actorId = SOCIAL_ACTORS[platform as keyof typeof SOCIAL_ACTORS]
    
    if (!actorId) {
      throw new Error(`Unsupported platform: ${platform}`)
    }

    const input = {
      socialProfiles: [`https://${platform}.com/${handle}`],
    }

    const run = await client.actor(actorId).call(input)
    const { items } = await client.dataset(run.defaultDatasetId).listItems()

    return items[0] || null
  } catch (error) {
    console.error(`Error fetching ${platform} metrics:`, error)
    return null
  }
}

export default client