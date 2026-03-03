import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export default async function MediaKitViewPage({ params }: { params: { id: string } }) {
  const mediaKit = await prisma.mediaKit.findUnique({
    where: { id: params.id },
    include: {
      influencer: {
        include: {
          user: true,
        },
      },
    },
  })

  if (!mediaKit) {
    notFound()
  }

  // Increment view count
  await prisma.mediaKit.update({
    where: { id: params.id },
    data: { views: { increment: 1 } },
  })

  return (
    <div dangerouslySetInnerHTML={{ __html: mediaKit.html }} />
  )
}
