import type { MetadataRoute } from 'next';
import { studio } from '@/data/site';
export default function sitemap():MetadataRoute.Sitemap{return studio.siteUrl?[{url:studio.siteUrl,changeFrequency:'monthly',priority:1}]:[];}
