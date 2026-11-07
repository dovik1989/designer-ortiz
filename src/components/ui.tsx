import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { whatsappUrl } from '@/data/site';

export function ContactLink({ children = 'Conversar no WhatsApp', className = '', subject }: { children?: React.ReactNode; className?: string; subject?: string }) {
  return <a href={whatsappUrl(subject)} className={`button button-primary ${className}`} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={18} aria-hidden="true" /></a>;
}

export function Logo() { return <Image className="wordmark" src="/brand/LUDOVIK_wordmark_branco.svg" alt="LUDOVIK" width={1200} height={260} loading="eager" unoptimized />; }
