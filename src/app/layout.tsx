import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { studio } from '@/data/site';

const grotesk = localFont({ src: [
  { path: '../../public/fonts/space-grotesk-regular.ttf', weight: '400', style: 'normal' },
  { path: '../../public/fonts/space-grotesk-medium.ttf', weight: '500', style: 'normal' },
  { path: '../../public/fonts/space-grotesk-semibold.ttf', weight: '600', style: 'normal' },
], variable: '--font-grotesk', display: 'swap' });
const serif = localFont({ src: '../../public/fonts/instrument-serif-italic.ttf', weight: '400', style: 'italic', variable: '--font-serif', display: 'swap' });

export const metadata: Metadata = {
  ...(studio.siteUrl ? {metadataBase: new URL(studio.siteUrl)} : {}),
  title: { default: 'LUDOVIK — Estúdio Digital', template: '%s | LUDOVIK' },
  description: 'Sites, landing pages, identidade visual e automações que conectam marcas a novas oportunidades. Design e tecnologia com Ludovik.',
  applicationName: 'LUDOVIK',
  openGraph: { title: 'LUDOVIK — Estúdio Digital', description: 'Experiências digitais que fazem seu negócio avançar.', locale: 'pt_BR', type: 'website' },
  twitter: { card: 'summary', title: 'LUDOVIK — Estúdio Digital' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className={`${grotesk.variable} ${serif.variable}`}><body><a className="skip-link" href="#conteudo">Pular para o conteúdo</a>{children}</body></html>;
}
