import { MetadataRoute } from 'next';

// This would ideally come from your database
const products = [
  { id: 'wheat', lastMod: new Date() },
  { id: 'mustard', lastMod: new Date() },
  { id: 'garlic', lastMod: new Date() },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kishanco.com';

  const mainPages = [
    { url: '', priority: 1, changeFrequency: 'daily' },
    { url: '/products', priority: 0.9, changeFrequency: 'daily' },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/track-orders', priority: 0.5, changeFrequency: 'weekly' },
  ].map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency as any,
    priority: page.priority,
  }));

  const productPages = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: product.lastMod,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...mainPages, ...productPages];
}
