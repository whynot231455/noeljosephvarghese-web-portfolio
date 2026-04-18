import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // Replace with your actual domain when deploying
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://noelj.com';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
