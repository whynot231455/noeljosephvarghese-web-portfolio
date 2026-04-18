import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // Replace with your actual domain when deploying
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noelj.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dev/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
