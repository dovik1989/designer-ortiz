import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '../../public/brand/ludovik-tokens.css';
import './globals.css';
import { studio } from '@/data/site';

const grotesk = localFont({ src: [
  { path: '../../public/fonts/space-grotesk-regular.ttf', weight: '400', style: 'normal' },
  { path: '../../public/fonts/space-grotesk-medium.ttf', weight: '500', style: 'normal' },
  { path: '../../public/fonts/space-grotesk-semibold.ttf', weight: '600', style: 'normal' },
], variable: '--font-grotesk', display: 'swap' });
const serif = localFont({ src: '../../public/fonts/instrument-serif-italic.ttf', weight: '400', style: 'italic', variable: '--font-serif', display: 'swap' });

const socialImage = {
  url: '/brand/LUDOVIK_open_graph.png',
  width: 1200,
  height: 630,
  alt: 'LUDOVIK — Estúdio Digital',
};

export const metadata: Metadata = {
  ...(studio.siteUrl ? { metadataBase: new URL(studio.siteUrl) } : {}),
  title: { default: 'LUDOVIK — Estúdio Digital', template: '%s | LUDOVIK' },
  description: 'Sites, landing pages, identidade visual e automações que conectam marcas a novas oportunidades. Design e tecnologia com Ludovik.',
  applicationName: 'LUDOVIK',
  manifest: '/brand/site.webmanifest',
  icons: {
    icon: [
      { url: '/brand/favicon.ico', type: 'image/x-icon', sizes: '16x16 32x32 48x48 64x64 128x128 256x256' },
      { url: '/brand/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/brand/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/brand/favicon-48x48.png', type: 'image/png', sizes: '48x48' },
      { url: '/brand/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
    shortcut: '/brand/favicon.ico',
    apple: [{ url: '/brand/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
  openGraph: {
    title: 'LUDOVIK — Estúdio Digital',
    description: 'Experiências digitais que fazem seu negócio avançar.',
    siteName: 'LUDOVIK',
    locale: 'pt_BR',
    type: 'website',
    images: [socialImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LUDOVIK — Estúdio Digital',
    description: 'Experiências digitais que fazem seu negócio avançar.',
    images: [{ url: socialImage.url, alt: socialImage.alt }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#08080C',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${grotesk.variable} ${serif.variable}`}><body><a className="skip-link" href="#conteudo">Pular para o conteúdo</a>{children}</body></html>;
}
